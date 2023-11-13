import React, { useEffect } from "react";

const BannerTravel = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.textContent = `
            var affiliatesCountdownFinalDate = {
                day: 30,
                month: 11,
                year: 2023,
                hours: 23,
                minutes: 59,
                seconds: 59
            };
            
            var affiliatesBannerStartDate = {
                day: 01,
                month: 11,
                year: 2023,
                hours: 1,
                minutes: 0,
                seconds: 0
            };
            
            var affiliatesBannerFinalDate = affiliatesCountdownFinalDate;
            
            var affiliatesTopBannerParameters = {
                language: "es",
                flipclockCustomStyleUrl: "//sc.cdnpt.com/copa-vacations/css/affiliatesTopBanner.custom.css",
                linkBannerHRef: "",
                imageLeftSrc: "",
                imageLeftAlt: "",
                middleColumnInnerHTML: "<img class='globalBanner-image' src='https://b2b-b2b2c.s3.amazonaws.com/recursos/images/hotsaleaf.jpeg' alt='Hot Sale'><img class='globalBanner-image' src='https://b2b-b2b2c.s3.amazonaws.com/recursos/images/75.jpeg' alt='¡Por tiempo limitado!'>",
                htmlFileUrl: "//sc.cdnpt.com/general/html/affiliatesTopBannerContainer.html",
                flipclockFileUrl: "//sc.cdnpt.com/general/js/flipclock.min.js",
                flipclockGeneralStyleUrl: "//sc.cdnpt.com/general/css/flipclock.min.css",
                countDownFinalDate: affiliatesCountdownFinalDate,
                bannerStartDate: affiliatesBannerStartDate,
                bannerFinalDate: affiliatesBannerFinalDate
            };
        `;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src =
      "//sc.cdnpt.com/general/js/affiliatesBannerInitializers.min.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      // Código de limpieza si es necesario
    };
  }, []);

  return (
    <div
      className="affiliatesTopBanner"
      style={{
        backgroundImage:
          "linear-gradient(to right top, #ef2323, #e71b29, #de122e, #d50a32, #cc0335)",
        paddingTop: "10px",
        marginBottom: "-2px",
      }}
    >
      {/* Contenido del banner */}
    </div>
  );
};

export default BannerTravel;
