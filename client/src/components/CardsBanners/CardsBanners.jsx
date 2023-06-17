import React, { useContext } from "react";
import CardBanner from "../CardBanner/CardBanner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Carrusel.css";
import { ContextGlobal } from "../../ContextGlobal/ContextGlobal";

function CardsBanners() {
  const { banner } = useContext(ContextGlobal);

  const mobileSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const desktopSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
      <div className="container px-4 md:px-0 md:mx-0 items-center">
        <Slider {...mobileSettings} className="md:hidden">
          {banner.map((e) => (
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
          {banner.map((e) => (
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
