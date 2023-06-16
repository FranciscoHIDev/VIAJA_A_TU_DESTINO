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
    }, 0);
  });

  const loader = () => {
    return (
      <>
        <SkeletonTheme baseColor="#ebebeb" highlightColor="#f8f8f8">
          <div className="rounded-[10px] md:w-[405px] bg-white md:h-[244px] w-[400px] h-[240px] border-none m-[8px] items-center">
            <div className="flex flex-col  text-[20px] text-[#fff] mt-8">
              <p className="mx-4">{<Skeleton enableAnimation="true" />}</p>
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
        <div className="mt-[30px] rounded-[10px] bg-[#fff] md:w-[405px] md:h-[244px] h-[220px] border-none m-[8px] ">
          <img
            className="md:w-[405px] md:h-[244px] h-[220px] w-[405px] rounded-[10px]"
            src={image}
            alt="image"
          />
          <div className="flex flex-col mt-[-100px] ml-[20px] md:text-[20px] text-[#fff]  ">
            <p className="font-[500] mb-[-3px] drop-shadow-[0.1em_0.1em_0.1em_black] ">
              {textPromotion}
            </p>
            <p className="font-[500] drop-shadow-[0.1em_0.1em_0.1em_black] ">
              {textDiscount}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default CardBanner;
