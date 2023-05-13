import React, { useEffect } from "react";

const AffiliatesTopBanner = () => {
  useEffect(() => {
    const affiliatesCountdownFinalDate = {
      day: 31,
      month: 5,
      year: 2023,
      hours: 23,
      minutes: 59,
      seconds: 59,
    };

    const affiliatesBannerStartDate = {
      day: 28,
      month: 5,
      year: 2021,
      hours: 1,
      minutes: 0,
      seconds: 0,
    };

    const affiliatesBannerFinalDate = affiliatesCountdownFinalDate;

    const affiliatesTopBannerParameters = {
      language: "es",
      flipclockCustomStyleUrl:
        "//sc.cdnpt.com/copa-vacations/css/affiliatesTopBanner.custom.css",
      linkBannerHRef: "",
      imageLeftSrc: "",
      imageLeftAlt: "",
      middleColumnInnerHTML:
        "<img class='globalBanner-image' src='https://b2b-b2b2c.s3.amazonaws.com/recursos/images/hotsaleaf.jpeg' alt='Hot Sale'><img class='globalBanner-image' src='https://b2b-b2b2c.s3.amazonaws.com/recursos/images/75.jpeg' alt='¡Por tiempo limitado!'>",
      htmlFileUrl:
        "//sc.cdnpt.com/general/html/affiliatesTopBannerContainer.html",
      flipclockFileUrl: "//sc.cdnpt.com/general/js/flipclock.min.js",
      flipclockGeneralStyleUrl: "//sc.cdnpt.com/general/css/flipclock.min.css",
      countDownFinalDate: affiliatesCountdownFinalDate,
      bannerStartDate: affiliatesBannerStartDate,
      bannerFinalDate: affiliatesBannerFinalDate,
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "flipclockinit";
    script.innerHTML = `
      var affiliatesCountdownFinalDate = ${JSON.stringify(
        affiliatesCountdownFinalDate
      )};
      var affiliatesBannerStartDate = ${JSON.stringify(
        affiliatesBannerStartDate
      )};
      var affiliatesBannerFinalDate = ${JSON.stringify(
        affiliatesBannerFinalDate
      )};
      var affiliatesTopBannerParameters = ${JSON.stringify(
        affiliatesTopBannerParameters
      )};
    `;
    document.body.appendChild(script);

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src =
      "//sc.cdnpt.com/general/js/affiliatesBannerInitializers.min.js";
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
    };
  }, []);

  return <nav className="navbar"></nav>;
};

export default AffiliatesTopBanner;
