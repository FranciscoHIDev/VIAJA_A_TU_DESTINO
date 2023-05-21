import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardBanner({
  destination,
  discount,
  image,
  textDiscount,
  textPromotion,
  link,
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  const loader = () => {
    return (
      <>
        <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
          <div className="mt-[30px] rounded-[10px] w-[405px] bg-white h-[244px] border-none m-[8px] items-center">
            <div className="w-[405px] h-[244px] rounded-[10px]">
              <Skeleton />
            </div>
            <div className="flex flex-col mt-[-100px]  text-[20px] text-[#fff]">
              <p className="mx-4">{<Skeleton />}</p>
              <p className=" mx-4">{<Skeleton />}</p>
            </div>
          </div>
        </SkeletonTheme>
      </>
    );
  };

  if (loading) {
    return loader();
  } else {
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
}

export default CardBanner;
