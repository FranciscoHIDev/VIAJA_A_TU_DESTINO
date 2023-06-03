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
  const isMobile = window.innerWidth < 768;

  const mobileSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 2000,
    autoplay: true,
  };

  const desktopSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const settings = isMobile ? mobileSettings : desktopSettings;
  return (
    <>
      <div className="container mx-8 md:mx-0">
        <Slider {...settings}>
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
        </Slider>
      </div>
    </>
  );
}

export default CardsBanners;
