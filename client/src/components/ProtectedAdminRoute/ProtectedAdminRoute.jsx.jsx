import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../../services/api";

export default function ProtectedAdminRoute() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let mounted = true;

    const verifySession = async () => {
      try {
        await api.get("/auth/me");

        if (mounted) {
          setStatus("authenticated");
        }
      } catch {
        if (mounted) {
          setStatus("unauthenticated");
        }
      }
    };

    verifySession();

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7ff] text-[#253777]">
        Verificando sesión...
      </div>
    );
  }

  return status === "authenticated" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" replace />
  );
}
