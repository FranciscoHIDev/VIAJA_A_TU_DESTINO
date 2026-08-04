const { MONGODB } = require("./db");
const express = require("express");
const router = require("./src/routes/index");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("Falta JWT_SECRET en tu archivo .env");
}

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_ALT,
  ...(process.env.NODE_ENV !== "production"
    ? ["http://localhost:5173"]
    : []),
].filter(Boolean);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skip: (req) => req.method === "OPTIONS",
  message: {
    message: "Demasiadas solicitudes. Intenta nuevamente más tarde.",
  },
});

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(helmet());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origen no permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
    optionsSuccessStatus: 204,
  }),
);

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api", apiLimiter, router);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Viaja a tu Destino API");
});

app.use((error, req, res, next) => {
  if (error.message === "Origen no permitido por CORS") {
    return res.status(403).json({
      message: "Origen no permitido.",
    });
  }

  console.error(error);
  return res.status(500).json({
    message: "Error interno del servidor.",
  });
});

const startServer = async () => {
  try {
    await MONGODB();

    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`);
    });
  } catch {
    process.exit(1);
  }
};

startServer();

module.exports = app;