import { useEffect, useState } from "react";

import api from "../../services/api";

import SEO from "../SEO/SEO";

// ======================================================
// FALLBACKS
// ======================================================

const DEFAULT_SEO = {
  title: "",
  description: "",
  canonicalUrl: "",
  image: "",
  socialTitle: "",
  socialDescription: "",
  index: true,
  follow: true,
};

// ======================================================
// PAGE SEO
// ======================================================

const PageSEO = ({
  pageKey,

  fallbackTitle = "",

  fallbackDescription = "",

  fallbackImage = "",

  fallbackUrl = "",

  schema = null,
}) => {
  const [page, setPage] = useState(null);

  // ====================================================
  // GET SEO
  // ====================================================

  useEffect(() => {
    let mounted = true;

    const loadSeo = async () => {
      if (!pageKey) {
        return;
      }

      try {
        const response = await api.get(
          `/page-seo/${encodeURIComponent(pageKey)}`,
        );

        if (mounted) {
          setPage(response.data);
        }
      } catch (error) {
        // La página sigue funcionando aunque
        // la configuración SEO no esté disponible.

        if (mounted) {
          setPage(null);
        }

        if (import.meta.env.DEV) {
          console.warn(`VTD SEO: no fue posible cargar "${pageKey}".`, error);
        }
      }
    };

    loadSeo();

    return () => {
      mounted = false;
    };
  }, [pageKey]);

  // ====================================================
  // SEO
  // ====================================================

  const seo = {
    ...DEFAULT_SEO,
    ...(page?.seo || {}),
  };

  const title = seo.title || fallbackTitle;

  const description = seo.description || fallbackDescription;

  const image = seo.image || fallbackImage;

  const canonicalUrl = seo.canonicalUrl || fallbackUrl;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <SEO
      title={title}
      description={description}
      canonicalUrl={canonicalUrl}
      image={image}
      socialTitle={seo.socialTitle}
      socialDescription={seo.socialDescription}
      index={seo.index !== false}
      follow={seo.follow !== false}
      type="website"
      schema={schema}
    />
  );
};

export default PageSEO;
