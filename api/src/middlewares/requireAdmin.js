const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const COOKIE_NAME = "vtd_admin_session";

const jwtOptions = {
  issuer: process.env.JWT_ISSUER || "viaja-a-tu-destino-api",
  audience: process.env.JWT_AUDIENCE || "viaja-a-tu-destino-admin",
};

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_ALT,
  ...(process.env.NODE_ENV !== "production"
    ? ["http://localhost:5173"]
    : []),
].filter(Boolean);

const requireTrustedOrigin = (req, res, next) => {
  const origin = req.get("origin");

  if (!origin || allowedOrigins.includes(origin)) {
    return next();
  }

  return res.status(403).json({
    message: "Solicitud no permitida.",
  });
};

const requireAdmin = async (req, res, next) => {
  try {
    const token = req.cookies[COOKIE_NAME];

    if (!token) {
      return res.status(401).json({
        message: "Tu sesión ha terminado. Inicia sesión nuevamente.",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET, jwtOptions);

    const admin = await Admin.findOne({
      _id: payload.sub,
      role: "admin",
      isActive: true,
    }).select("_id email role isActive sessionVersion");

    if (!admin || admin.sessionVersion !== payload.sessionVersion) {
      return res.status(401).json({
        message: "Tu sesión ya no es válida.",
      });
    }

    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({
      message: "Tu sesión ha terminado. Inicia sesión nuevamente.",
    });
  }
};

module.exports = {
  COOKIE_NAME,
  jwtOptions,
  requireAdmin,
  requireTrustedOrigin,
};