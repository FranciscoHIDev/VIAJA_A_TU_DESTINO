import React, { useEffect, useState } from "react";
import axios from "axios";
import CardBanner from "../CardBanner/CardBanner";
import "./CardsBanners.css";

function CardsBanners() {
  const [banners, setBanners] = useState([]);

  const allBanners = async () => {
    const { data } = await axios.get("/api/banners");
    console.log(data);
    setBanners(data);
  };
  useEffect(() => {
    allBanners();
  }, []);

  return (
    <>
      <div className="container-banners">
        {banners.map((e) => {
          return (
            <CardBanner
              key={crypto.randomUUID()}
              destination={e.destination}
              image={e.image}
              discount={e.discount}
              textDiscount={e.textDiscount}
              textPromotion={e.textPromotion}
              link={e.link}
            />
          );
        })}
      </div>
    </>
  );
}

export default CardsBanners;
