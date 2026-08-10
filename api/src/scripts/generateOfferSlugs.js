require("dotenv").config();

const mongoose = require("mongoose");
const Offers = require("../models/Offers");

async function generateOfferSlugs() {
  try {
    console.log("Conectando a MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB conectado");

    const offers = await Offers.find({});

    console.log(`Ofertas encontradas: ${offers.length}`);

    for (const offer of offers) {
      // Quitamos el slug actual para forzar su regeneración
      offer.slug = undefined;

      await offer.save();

      console.log(`✅ ${offer.title}`);
      console.log(`   Slug: ${offer.slug}`);
    }

    console.log("");
    console.log("✅ Slugs generados correctamente");

    await mongoose.disconnect();

    process.exit(0);
  } catch (error) {
    console.error("❌ Error generando slugs:");
    console.error(error);

    await mongoose.disconnect();

    process.exit(1);
  }
}

generateOfferSlugs();