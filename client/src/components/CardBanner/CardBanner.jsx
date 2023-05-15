import React from "react";
import "./CardBanner.css";

function CardBanner({
  destination,
  discount,
  image,
  textDiscount,
  textPromotion,
  link,
}) {
  return (
    <>
      <div className="conteiner-banner">
        <img className="image-banner" src={image} alt="image" />
        <div className="item-promotion-banner">
          <p className="promotion-banner">{textPromotion}</p>
        <p className="discount-banner">{textDiscount}</p></div>        
      </div>
    </>
  );
}

export default CardBanner;
