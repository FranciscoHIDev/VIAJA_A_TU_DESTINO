const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  login,
  logout,
  getCurrentAdmin,
} = require("../controllers/authController");

const {
  requireAdmin,
  requireTrustedOrigin,
} = require("../middlewares/requireAdmin");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    message: "Demasiados intentos. Intenta nuevamente más tarde.",
  },
});

router.post("/login", requireTrustedOrigin, loginLimiter, login);
router.post("/logout", requireTrustedOrigin, requireAdmin, logout);
router.get("/me", requireAdmin, getCurrentAdmin);

module.exports = router;