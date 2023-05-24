import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Loading() {
    return (
        <SkeletonTheme baseColor="#ebebeb" highlightColor="#f8f8f8">
          <div className="mt-[30px] rounded-[20px] bg-white md:w-[390px] md:h-[490px] m-[15px] border-none w-[350px] h-[490px]">
            <div className="flex flex-row mt-8 md:ml-[300px] ml-[250px]">
              <div className="mr-2">
                {" "}
                <Skeleton width={30} height={30} circle={true} />
              </div>
              <div>
                {" "}
                <Skeleton width={30} height={30} circle={true} />
              </div>
            </div>
            <div>{<Skeleton width={120} height={40} />}</div>
            <div className="mt-[100px] flex flex-row ml-[20px]">
              {<Skeleton width={40} height={25} />}
              <span className="ml-[10px]">
                {<Skeleton width={90} height={25} />}
              </span>
            </div>
            <div className="ml-[20px]">
              {" "}
              {<Skeleton width={180} height={25} />}
            </div>
            <div className="ml-[20px]">
              {" "}
              {<Skeleton width={305} height={25} />}
            </div>
            <div className="ml-[20px]">
              {" "}
              {<Skeleton width={305} height={25} />}
            </div>
            <div className="ml-[20px]">
              {" "}
              {<Skeleton width={230} height={25} />}
            </div>
            <div className="ml-[20px]">
              {" "}
              {<Skeleton width={230} height={25} />}
            </div>
            <div className="mt-8 flex flex-row justify-between mx-[20px]">
              <div> {<Skeleton width={120} height={30} />}</div>
              <div> {<Skeleton width={120} height={30} />}</div>
            </div>
          </div>
        </SkeletonTheme>
      );
}

export default Loading