import { useEffect, useMemo, useState } from "react";

import {
  FaEdit,
  FaEye,
  FaFileAlt,
  FaPlus,
  FaSearch,
  FaStar,
  FaTrash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import api from "../../services/api";

// ======================================================
// HELPERS
// ======================================================

const formatDate = (value) => {
  if (!value) {
    return "Sin fecha";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getStatusData = (status) => {
  switch (status) {
    case "published":
      return {
        label: "Publicado",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };

    case "archived":
      return {
        label: "Archivado",
        className: "bg-slate-100 text-slate-600 border-slate-200",
      };

    default:
      return {
        label: "Borrador",
        className: "bg-amber-50 text-amber-700 border-amber-200",
      };
  }
};

// ======================================================
// COMPONENTE
// ======================================================

function BlogAdmin() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  // ====================================================
  // CARGAR BLOG
  // ====================================================

  useEffect(() => {
    let mounted = true;

    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/blog/admin");

        if (!mounted) {
          return;
        }

        setBlogs(Array.isArray(response.data) ? response.data : []);
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        const message =
          requestError?.response?.data?.message ||
          "No fue posible cargar los artículos.";

        setError(message);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      mounted = false;
    };
  }, []);

  // ====================================================
  // ESTADÍSTICAS
  // ====================================================

  const statistics = useMemo(() => {
    const total = blogs.length;

    const published = blogs.filter(
      (blog) => blog.status === "published",
    ).length;

    const drafts = blogs.filter((blog) => blog.status === "draft").length;

    const archived = blogs.filter((blog) => blog.status === "archived").length;

    const views = blogs.reduce(
      (totalViews, blog) => totalViews + Number(blog.views || 0),
      0,
    );

    return {
      total,
      published,
      drafts,
      archived,
      views,
    };
  }, [blogs]);

  // ====================================================
  // FILTRAR ARTÍCULOS
  // ====================================================

  const filteredBlogs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      if (statusFilter !== "all" && blog.status !== statusFilter) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const tags = Array.isArray(blog.tags) ? blog.tags.join(" ") : "";

      const searchableText = [
        blog.title,
        blog.excerpt,
        blog.author,
        blog.category,
        tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [blogs, search, statusFilter]);

  // ====================================================
  // ELIMINAR ARTÍCULO
  // ====================================================

  const handleDelete = async (blog) => {
    const result = await Swal.fire({
      icon: "warning",

      title: "¿Eliminar artículo?",

      text: `Se eliminará "${blog.title}" de forma permanente.`,

      showCancelButton: true,

      confirmButtonText: "Sí, eliminar",

      cancelButtonText: "Cancelar",

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#64748b",

      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await api.delete(`/blog/${blog._id}`);

      setBlogs((currentBlogs) =>
        currentBlogs.filter((item) => item._id !== blog._id),
      );

      await Swal.fire({
        icon: "success",

        title: "Artículo eliminado",

        text: "El artículo fue eliminado correctamente.",

        showConfirmButton: false,

        timer: 1600,
      });
    } catch (requestError) {
      const message =
        requestError?.response?.data?.errors?.[0]?.message ||
        requestError?.response?.data?.message ||
        "No fue posible eliminar el artículo.";

      Swal.fire({
        icon: "error",

        title: "No se pudo eliminar",

        text: message,
      });
    }
  };

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-slate-200 bg-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-[#0260fe]" />

          <p className="mt-4 text-lg font-black text-slate-800">
            Cargando blog...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Estamos obteniendo los artículos.
          </p>
        </div>
      </div>
    );
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="min-h-full rounded-3xl bg-[#f4f7fb] p-3 sm:p-5">
      {/* =================================================
          ENCABEZADO
      ================================================= */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#023e73] via-[#0252ad] to-[#0260fe] px-5 py-7 text-white shadow-xl sm:px-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10" />

        <div className="absolute -bottom-28 right-32 h-56 w-56 rounded-full bg-cyan-300/10" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl shadow-inner backdrop-blur">
              <FaFileAlt />
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
                  Administración de contenido
                </span>

                <span className="rounded-full bg-orange-400/20 px-3 py-1 text-xs font-bold text-orange-100">
                  {statistics.total} artículos
                </span>
              </div>

              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                Blog
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Crea, administra y publica contenido de viajes para atraer
                visitantes y posicionar tu sitio.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/auth/new-blog")}
            className="inline-flex w-fit items-center gap-2 rounded-2xl bg-[#ff6600] px-5 py-3 text-sm font-black text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:bg-[#ea5d00]"
          >
            <FaPlus />
            Nuevo artículo
          </button>
        </div>
      </section>

      {/* =================================================
          ESTADÍSTICAS
      ================================================= */}

      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard label="Artículos" value={statistics.total} />

        <StatCard label="Publicados" value={statistics.published} />

        <StatCard label="Borradores" value={statistics.drafts} />

        <StatCard label="Archivados" value={statistics.archived} />

        <StatCard label="Vistas" value={statistics.views} fullMobile />
      </section>

      {/* =================================================
          BUSCADOR Y FILTROS
      ================================================= */}

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* BUSCADOR */}

          <div className="relative w-full xl:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título, categoría, autor o etiqueta..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0260fe] focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {/* FILTROS */}

          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={statusFilter === "all"}
              onClick={() => setStatusFilter("all")}
            >
              Todos
            </FilterButton>

            <FilterButton
              active={statusFilter === "published"}
              onClick={() => setStatusFilter("published")}
            >
              Publicados
            </FilterButton>

            <FilterButton
              active={statusFilter === "draft"}
              onClick={() => setStatusFilter("draft")}
            >
              Borradores
            </FilterButton>

            <FilterButton
              active={statusFilter === "archived"}
              onClick={() => setStatusFilter("archived")}
            >
              Archivados
            </FilterButton>
          </div>
        </div>
      </section>

      {/* =================================================
          ERROR
      ================================================= */}

      {error ? (
        <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </section>
      ) : null}

      {/* =================================================
          LISTADO
      ================================================= */}

      <section className="mt-6">
        {filteredBlogs.length === 0 ? (
          <EmptyState
            hasBlogs={blogs.length > 0}
            onCreate={() => navigate("/auth/new-blog")}
          />
        ) : (
          <>
            {/* =============================================
                DESKTOP
            ============================================= */}

            <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                        Artículo
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                        Categoría
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                        Estado
                      </th>

                      <th className="px-4 py-4 text-center text-xs font-black uppercase tracking-wider text-slate-500">
                        Vistas
                      </th>

                      <th className="px-4 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                        Publicación
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredBlogs.map((blog) => (
                      <BlogTableRow
                        key={blog._id}
                        blog={blog}
                        onEdit={() => navigate(`/auth/blog/${blog._id}/editar`)}
                        onDelete={() => handleDelete(blog)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* =============================================
                MÓVIL / TABLET
            ============================================= */}

            <div className="grid grid-cols-1 gap-4 lg:hidden">
              {filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  onEdit={() => navigate(`/auth/blog/${blog._id}/editar`)}
                  onDelete={() => handleDelete(blog)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

// ======================================================
// FILA DESKTOP
// ======================================================

function BlogTableRow({ blog, onEdit, onDelete }) {
  const status = getStatusData(blog.status);

  return (
    <tr className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/70">
      {/* ARTÍCULO */}

      <td className="px-5 py-4">
        <div className="flex min-w-[300px] items-center gap-4">
          <BlogImage blog={blog} />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="max-w-[350px] truncate font-black text-slate-900">
                {blog.title}
              </p>

              {blog.isFeatured ? (
                <span title="Artículo destacado" className="text-[#ff6600]">
                  <FaStar />
                </span>
              ) : null}
            </div>

            <p className="mt-1 max-w-[380px] truncate text-xs text-slate-400">
              {blog.excerpt || blog.slug}
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-500">
              {blog.author || "Viaja a tu Destino"}
            </p>
          </div>
        </div>
      </td>

      {/* CATEGORÍA */}

      <td className="px-4 py-4">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0260fe]">
          {blog.category || "Sin categoría"}
        </span>
      </td>

      {/* ESTADO */}

      <td className="px-4 py-4">
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-black ${status.className}`}
        >
          {status.label}
        </span>
      </td>

      {/* VISTAS */}

      <td className="px-4 py-4 text-center">
        <div className="inline-flex items-center gap-2 font-bold text-slate-600">
          <FaEye className="text-slate-400" />

          {Number(blog.views || 0).toLocaleString("es-MX")}
        </div>
      </td>

      {/* FECHA */}

      <td className="px-4 py-4">
        <p className="text-sm font-bold text-slate-700">
          {formatDate(blog.publishedAt)}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Creado {formatDate(blog.createdAt)}
        </p>
      </td>

      {/* ACCIONES */}

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white"
            title="Editar artículo"
          >
            <FaEdit />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
            title="Eliminar artículo"
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ======================================================
// TARJETA MÓVIL
// ======================================================

function BlogCard({ blog, onEdit, onDelete }) {
  const status = getStatusData(blog.status);

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-48 bg-slate-100">
        {blog.featuredImage?.url ? (
          <img
            src={blog.featuredImage.url}
            alt={blog.featuredImage.alt || blog.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#023e73] to-[#0260fe]">
            <FaFileAlt className="text-4xl text-white/60" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <span
          className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-black ${status.className}`}
        >
          {status.label}
        </span>

        {blog.isFeatured ? (
          <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#ff6600] text-white shadow-lg">
            <FaStar />
          </span>
        ) : null}

        <span className="absolute bottom-4 left-4 rounded-full bg-[#0260fe] px-3 py-1 text-xs font-bold text-white">
          {blog.category || "Sin categoría"}
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-lg font-black leading-snug text-slate-900">
          {blog.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {blog.excerpt || "Este artículo todavía no tiene un resumen."}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
          <div>
            <p className="font-bold text-slate-700">
              {blog.author || "Viaja a tu Destino"}
            </p>

            <p className="mt-1 text-slate-400">
              {formatDate(blog.publishedAt)}
            </p>
          </div>

          <div className="flex items-center gap-2 font-bold text-slate-500">
            <FaEye />

            {Number(blog.views || 0).toLocaleString("es-MX")}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white"
          >
            <FaEdit />
            Editar
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-black text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            <FaTrash />
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

// ======================================================
// IMAGEN
// ======================================================

function BlogImage({ blog }) {
  if (blog.featuredImage?.url) {
    return (
      <img
        src={blog.featuredImage.url}
        alt={blog.featuredImage.alt || blog.title}
        className="h-16 w-20 shrink-0 rounded-xl object-cover"
      />
    );
  }

  return (
    <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#023e73] to-[#0260fe]">
      <FaFileAlt className="text-xl text-white/70" />
    </div>
  );
}

// ======================================================
// ESTADÍSTICA
// ======================================================

function StatCard({ label, value, fullMobile = false }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${
        fullMobile ? "col-span-2 lg:col-span-1" : ""
      }`}
    >
      <p className="text-xs font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-slate-900">
        {Number(value || 0).toLocaleString("es-MX")}
      </p>
    </div>
  );
}

// ======================================================
// BOTÓN FILTRO
// ======================================================

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-xs font-black transition ${
        active
          ? "bg-[#0260fe] text-white shadow-md shadow-blue-500/20"
          : "border border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0260fe]"
      }`}
    >
      {children}
    </button>
  );
}

// ======================================================
// EMPTY STATE
// ======================================================

function EmptyState({ hasBlogs, onCreate }) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-[#0260fe]">
        <FaFileAlt />
      </div>

      <h2 className="mt-5 text-xl font-black text-slate-900">
        {hasBlogs ? "No encontramos artículos" : "Todavía no tienes artículos"}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {hasBlogs
          ? "Prueba con otra búsqueda o cambia el filtro seleccionado."
          : "Crea tu primer artículo para comenzar a publicar contenido en el blog de Viaja a tu Destino."}
      </p>

      {!hasBlogs ? (
        <button
          type="button"
          onClick={onCreate}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0260fe] px-5 py-3 text-sm font-black text-white transition hover:bg-[#014fd3]"
        >
          <FaPlus />
          Crear primer artículo
        </button>
      ) : null}
    </div>
  );
}

export default BlogAdmin;
