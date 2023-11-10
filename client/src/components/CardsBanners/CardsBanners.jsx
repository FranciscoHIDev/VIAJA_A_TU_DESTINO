import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Carrusel.css";
import { GiTruce } from "react-icons/gi";

function CardsBanners() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };
  return (
    <React.Fragment>
      <div className="container  items-center">
        <Slider {...settings} className="">
          <div>
            <img
              className=""
              src="https://res.cloudinary.com/duaysiozi/image/upload/v1699582346/slider_2_jeu4jy.jpg"
              alt="slider 1 "
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/duaysiozi/image/upload/v1699582346/slider_1_j5u7wi.jpg"
              alt="slider 2"
            />
          </div>
          <div>
            <img
              src="https://res.cloudinary.com/duaysiozi/image/upload/v1699582346/slider_3_cisyxx.jpg"
              alt="slider 3"
            />
          </div>
        </Slider>
      </div>
    </React.Fragment>
  );
}

export default CardsBanners;
