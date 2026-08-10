require("dotenv").config();

const mongoose = require("mongoose");
const Offers = require("../src/models/Offers");

console.log("🚀 Iniciando script...");

async function generateOfferSlugs() {
  try {
    console.log("🔌 Conectando a MongoDB...");

    if (!process.env.MONGODB_URI) {
      throw new Error("No se encontró MONGODB_URI en el archivo .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB conectado");

    const offers = await Offers.find({});

    console.log(`📦 Ofertas encontradas: ${offers.length}`);

    for (const offer of offers) {
      offer.slug = undefined;

      await offer.save();

      console.log(`✅ ${offer.title}`);
      console.log(`   Slug: ${offer.slug}`);
    }

    console.log("");
    console.log("🎉 Slugs generados correctamente");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error generando slugs:");
    console.error(error);

    await mongoose.disconnect();
  }
}

generateOfferSlugs();