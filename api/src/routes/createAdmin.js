const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const Admin = require("../models/Admin");

require("dotenv").config();

const adminSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(12).max(128),
});

const createAdmin = async () => {
  const result = adminSchema.safeParse({
    email: process.env.INITIAL_ADMIN_EMAIL,
    password: process.env.INITIAL_ADMIN_PASSWORD,
  });

  if (!result.success) {
    throw new Error(
      "Configura INITIAL_ADMIN_EMAIL y INITIAL_ADMIN_PASSWORD con una contraseña de al menos 12 caracteres.",
    );
  }

  const email = result.data.email.toLowerCase();
  const { password } = result.data;

  await mongoose.connect(process.env.MONGODB_URI);

  const exists = await Admin.findOne({ email });

  if (exists) {
    console.log("Ese administrador ya existe.");
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await Admin.create({
    email,
    passwordHash,
    role: "admin",
  });

  console.log("Administrador creado correctamente.");
};

createAdmin()
  .catch((error) => {
    console.error("No se pudo crear el administrador:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });