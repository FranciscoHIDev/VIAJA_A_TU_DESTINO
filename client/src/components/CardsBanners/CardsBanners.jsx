import React, { useEffect, useState } from "react";
import axios from "axios";
import CardBanner from "../CardBanner/CardBanner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Carrusel.css";

function CardsBanners() {
  const [banners, setBanners] = useState([]);

  const allBanners = async () => {
    const { data } = await axios.get("/api/banners");
    setBanners(data);
  };
  useEffect(() => {
    allBanners();
  }, []);

  const mobileSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  const desktopSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 6000,
  };
  return (
    <>
      <div className="container px-4 md:px-0 md:mx-0 items-center">
        <Slider {...mobileSettings} className="md:hidden">
          {banners.map((e) => (
            <CardBanner
              key={crypto.randomUUID()}
              destination={e.destination}
              image={e.image}
              discount={e.discount}
              textDiscount={e.textDiscount}
              textPromotion={e.textPromotion}
              link={e.link}
            />
          ))}
        </Slider>

        <Slider {...desktopSettings} className="hidden md:block">
          {banners.map((e) => (
            <CardBanner
              key={crypto.randomUUID()}
              destination={e.destination}
              image={e.image}
              discount={e.discount}
              textDiscount={e.textDiscount}
              textPromotion={e.textPromotion}
              link={e.link}
            />
          ))}
        </Slider>
      </div>
    </>
  );
}

export default CardsBanners;
