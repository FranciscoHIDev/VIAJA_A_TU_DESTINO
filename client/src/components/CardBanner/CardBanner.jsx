import React from "react";

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
      <div className="mt-[30px] rounded-[10px] bg-[#fff] w-[405px] h-[244px] border-none m-[8px]  ">
        <img
          className="w-[405px] h-[244px] rounded-[10px]"
          src={image}
          alt="image"
        />
        <div className="flex flex-col mt-[-100px] ml-[20px] text-[20px] text-[#fff]  ">
          <p className="font-[500] mb-[-3px] drop-shadow-[0.1em_0.1em_0.1em_black] ">
            {textPromotion}
          </p>
          <p className="font-[500] drop-shadow-[0.1em_0.1em_0.1em_black]">
            {textDiscount}
          </p>
        </div>
      </div>
    </>
  );
}

export default CardBanner;