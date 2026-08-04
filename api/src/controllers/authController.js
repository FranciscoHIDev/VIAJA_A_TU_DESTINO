const jwt = require("jsonwebtoken");
const { z } = require("zod");
const Admin = require("../models/Admin");
const {
  COOKIE_NAME,
  jwtOptions,
} = require("../middlewares/requireAdmin");

const SESSION_DURATION = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_DURATION = 15 * 60 * 1000;

const isProduction = process.env.NODE_ENV === "production";

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(12).max(128),
});

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,

  // Necesario mientras frontend y backend estén en dominios distintos.
  sameSite: isProduction ? "none" : "lax",

  maxAge: SESSION_DURATION,
  path: "/",
};

const clearCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

const invalidCredentials = (res) =>
  res.status(401).json({
    message: "Correo o contraseña incorrectos.",
  });

const safeAdmin = (admin) => ({
  id: admin._id,
  email: admin.email,
  role: admin.role,
});

const createSessionToken = (admin) =>
  jwt.sign(
    {
      sessionVersion: admin.sessionVersion,
    },
    process.env.JWT_SECRET,
    {
      subject: admin._id.toString(),
      expiresIn: "15m",
      ...jwtOptions,
    },
  );

const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Revisa el correo y la contraseña.",
      });
    }

    const email = result.data.email.toLowerCase();
    const { password } = result.data;
    const now = new Date();

    const admin = await Admin.findOne({ email }).select("+passwordHash");

    if (
      !admin ||
      !admin.isActive ||
      (admin.lockUntil && admin.lockUntil > now)
    ) {
      return invalidCredentials(res);
    }

    const passwordIsValid = await admin.comparePassword(password);

    if (!passwordIsValid) {
      const attempts = admin.failedLoginAttempts + 1;

      if (attempts >= MAX_LOGIN_ATTEMPTS) {
        admin.failedLoginAttempts = 0;
        admin.lockUntil = new Date(now.getTime() + LOCK_DURATION);
      } else {
        admin.failedLoginAttempts = attempts;
      }

      await admin.save();
      return invalidCredentials(res);
    }

    admin.failedLoginAttempts = 0;
    admin.lockUntil = null;
    admin.lastLoginAt = now;
    await admin.save();

    const token = createSessionToken(admin);

    return res
      .cookie(COOKIE_NAME, token, cookieOptions)
      .status(200)
      .json({
        message: "Sesión iniciada correctamente.",
        admin: safeAdmin(admin),
      });
  } catch (error) {
    console.error("Error during admin login:", error.message);

    return res.status(500).json({
      message: "No fue posible iniciar sesión. Intenta nuevamente.",
    });
  }
};

const logout = async (req, res) => {
  try {
    req.admin.sessionVersion += 1;
    await req.admin.save();

    return res
      .clearCookie(COOKIE_NAME, clearCookieOptions)
      .status(204)
      .send();
  } catch {
    return res.status(500).json({
      message: "No fue posible cerrar sesión.",
    });
  }
};

const getCurrentAdmin = (req, res) => {
  return res.status(200).json({
    admin: safeAdmin(req.admin),
  });
};

module.exports = {
  login,
  logout,
  getCurrentAdmin,
};