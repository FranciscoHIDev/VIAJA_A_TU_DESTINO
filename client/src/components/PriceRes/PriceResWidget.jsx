import React, { useEffect, useMemo, useRef, useState } from "react";

/*
  PriceResWidget
  =========================================================
  Integración del bloque COMPLETO original de PriceRes:

  - Carrusel / slideshow
  - Motor de búsqueda
  - Tabs
  - Calendario
  - Selectores

  Todo vive dentro de un iframe con srcDoc.

  BENEFICIO:
  El CSS global de PriceRes y su jQuery NO pueden modificar
  los estilos de tu aplicación React / Tailwind.
*/

const JQUERY_URL = "https://sc.cdnpt.com/general/js/1.0f/jquery-1.12.4.min.js";

const PRICE_RES_CSS =
  "https://b2b2c.cdnpt.com/viaja-a-tu-destino/css/custom.css";

const SLIDE_URL =
  "https://widgets.priceres.com.mx/viaja-a-tu-destino/AWvAyO1EkkkodL41TeY3Bw/JsDisplaySlide?bLoadSlideJS=true";

const PRICE_RES_BOOKER =
  "https://widgets.priceres.com.mx/viaja-a-tu-destino/jsonpBooker/startWidget";

const ENGINE_CONFIG = [
  "EngineConfigs[0].Engine=1",
  "SectionConfigs[0].SectionTab=1",
  "SectionConfigs[0].DefaultEngine=1",

  "EngineConfigs[1].Engine=2",
  "SectionConfigs[1].SectionTab=2",
  "SectionConfigs[1].DefaultEngine=2",

  "EngineConfigs[2].Engine=3",
  "SectionConfigs[2].SectionTab=3",
  "SectionConfigs[2].DefaultEngine=3",

  "EngineConfigs[3].Engine=4",
  "SectionConfigs[3].SectionTab=4",
  "SectionConfigs[3].DefaultEngine=4",

  "EngineConfigs[4].Engine=5",
  "SectionConfigs[4].SectionTab=5",
  "SectionConfigs[4].DefaultEngine=5",

  "EngineConfigs[5].Engine=6",
  "SectionConfigs[5].SectionTab=6",
  "SectionConfigs[5].DefaultEngine=6",

  "EngineConfigs[6].Engine=7",
  "SectionConfigs[6].SectionTab=7",
  "SectionConfigs[6].DefaultEngine=7",

  "EngineConfigs[7].Engine=9",
  "SectionConfigs[7].SectionTab=8",
  "SectionConfigs[7].DefaultEngine=9",

  "EngineConfigs[8].Engine=10",
  "SectionConfigs[8].SectionTab=9",
  "SectionConfigs[8].DefaultEngine=10",

  "EngineConfigs[9].Engine=8",
  "SectionConfigs[9].SectionTab=3",
  "SectionConfigs[9].DefaultEngine=3",
].join("&");

function normalizeSection(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function getReactHash() {
  if (typeof window === "undefined") return "";

  return normalizeSection(window.location.hash.substring(1));
}

function createDocument(section, showCarousel) {
  const safeSection = normalizeSection(section);

  return `<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <!-- CSS ORIGINAL DE PRICERES -->
  <link
    rel="stylesheet"
    type="text/css"
    href="${PRICE_RES_CSS}"
  />

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,700|Roboto:300,400,500,700,900&display=swap"
  />

  <!-- JQUERY ORIGINAL DE PRICERES -->
  <script src="${JQUERY_URL}"><\/script>

  <!--
    Cuando el motor navegue a resultados,
    saldrá del iframe y usará la ventana principal.
  -->
  <base target="_top" />

  <style>
    /*
      ========================================================
      SOLO PREPARAMOS EL DOCUMENTO DEL IFRAME
      ========================================================

      No rediseñamos PriceRes.
      custom.css conserva el diseño original del carrusel,
      tabs, buscador, botones y calendario.
    */

    html,
    body {
      margin: 0 !important;
      padding: 0 !important;

      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;

      height: auto !important;
      min-height: 0 !important;

      overflow-x: hidden !important;
      overflow-y: hidden !important;
      overflow: hidden !important;

      /*
        El usuario nunca debe hacer scroll dentro del widget.
        La altura del iframe se adapta al contenido y el scroll
        pertenece únicamente a la página React.
      */
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;

      background: transparent !important;
      background-color: transparent !important;
    }

    html::-webkit-scrollbar,
    body::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
      display: none !important;
    }

    #priceres-root {
      width: 100%;
      max-width: 100%;

      margin: 0;
      padding: 0;

      background: transparent;
    }

    /*
      El original está diseñado para ocupar todo el ancho
      disponible de su página.
    */
    .bookerBox {
      width: 100% !important;
      max-width: 100% !important;
    }

    /*
      El calendario de dos meses es demasiado ancho en móvil.

      SOLO en teléfonos mostramos un mes.
      No cambiamos su diseño.
    */
    @media (max-width: 767px) {
      #ui-datepicker-div.ui-datepicker-multi-2 {
        left: 4px !important;
        right: auto !important;

        width: calc(100vw - 8px) !important;
        max-width: calc(100vw - 8px) !important;

        box-sizing: border-box !important;
      }

      #ui-datepicker-div.ui-datepicker-multi-2
      .ui-datepicker-group-first {
        float: none !important;
        width: 100% !important;
      }

      #ui-datepicker-div.ui-datepicker-multi-2
      .ui-datepicker-group-last {
        display: none !important;
      }
    }
  </style>
</head>

<body class="home landing-home">

  <div id="priceres-root">

    <!--
      ======================================================
      ESTRUCTURA ORIGINAL
      ======================================================

      bookerBox
        slideContainer
        ptw-container
    -->

    <div class="bookerBox">

      ${
        showCarousel
          ? `
      <div
        id="slideContainer"
        class="slideshow"
      ></div>
      `
          : ""
      }

      <div
        id="ptw-container"
        class="ptw-horizontal-search bookerContainer"
      ></div>

    </div>

  </div>

  <script>
    (function () {
      "use strict";

      var selectedSection =
        "${safeSection}";

      var CONFIG =
        "${ENGINE_CONFIG}";

      /*
        =====================================================
        CARRUSEL
        =====================================================
      */

      function loadSlide() {
        ${
          showCarousel
            ? `
        var container =
          document.getElementById(
            "slideContainer"
          );

        if (!container) return;

        var script =
          document.createElement(
            "script"
          );

        script.type =
          "text/javascript";

        script.src =
          "${SLIDE_URL}";

        script.onload =
          requestHeightSoon;

        container.appendChild(
          script
        );
        `
            : ""
        }
      }

      /*
        =====================================================
        MOTOR
        =====================================================
      */

      function getBookerUrl() {
        var base =
          "${PRICE_RES_BOOKER}" +
          "?container=ptw-container";

        /*
          Sin sección:
          comportamiento original.
        */
        if (!selectedSection) {
          return (
            base +
            "&UseConfigs=false" +
            "&IsHorizontal=true"
          );
        }

        var currentSection =
          selectedSection;

        var currentEngine =
          selectedSection;

        /*
          Excepciones originales.
        */
        if (
          selectedSection === "8"
        ) {
          currentSection = "8";
          currentEngine = "9";
        }

        if (
          selectedSection === "9"
        ) {
          currentSection = "9";
          currentEngine = "10";
        }

        return (
          base +
          "&UseConfigs=true" +

          "&CurrentSection=" +
          encodeURIComponent(
            currentSection
          ) +

          "&CurrentEngine=" +
          encodeURIComponent(
            currentEngine
          ) +

          "&ShowProducts=true" +
          "&ShowHiddenTabs=true" +

          "&" +
          CONFIG +

          "&IsHorizontal=true"
        );
      }

      function setCurrentTab() {
        if (!window.jQuery) {
          return;
        }

        var id =
          selectedSection
            ? "#s" + selectedSection
            : "#s3";

        window.jQuery(id)
          .addClass("current");
      }

      function loadBooker() {
        var previous =
          document.getElementById(
            "main_booker"
          );

        if (previous) {
          previous.remove();
        }

        var script =
          document.createElement(
            "script"
          );

        script.id =
          "main_booker";

        script.type =
          "text/javascript";

        script.src =
          getBookerUrl();

        script.onload =
          function () {
            setCurrentTab();
            requestHeightSoon();
          };

        script.onerror =
          function () {
            var container =
              document.getElementById(
                "ptw-container"
              );

            if (container) {
              container.innerHTML =
                '<div style="' +
                'padding:20px;' +
                'font-family:Arial,sans-serif;' +
                'text-align:center;' +
                'color:#555' +
                '">' +
                'No fue posible cargar el buscador.' +
                '</div>';
            }

            requestHeightSoon();
          };

        /*
          Igual al código original:
          motor en HEAD.
        */
        document.head.appendChild(
          script
        );

        setTimeout(
          setCurrentTab,
          250
        );

        setTimeout(
          setCurrentTab,
          900
        );

        setTimeout(
          requestHeightSoon,
          400
        );

        setTimeout(
          requestHeightSoon,
          1200
        );

        setTimeout(
          requestHeightSoon,
          2200
        );
      }

      /*
        =====================================================
        ALTURA DEL IFRAME
        =====================================================

        Medimos contenido real, no body.scrollHeight.
      */

      var animationFrame = null;

      function visibleBottom(
        element
      ) {
        if (!element) return 0;

        var style =
          window.getComputedStyle(
            element
          );

        if (
          style.display === "none" ||
          style.visibility === "hidden"
        ) {
          return 0;
        }

        var rect =
          element.getBoundingClientRect();

        if (
          !rect.width &&
          !rect.height
        ) {
          return 0;
        }

        return Math.ceil(
          rect.bottom +
          window.pageYOffset
        );
      }

      function calculateHeight() {
        var height = 200;

        [
          document.getElementById(
            "priceres-root"
          ),

          document.querySelector(
            ".bookerBox"
          ),

          document.getElementById(
            "slideContainer"
          ),

          document.getElementById(
            "ptw-container"
          ),

          document.getElementById(
            "ui-datepicker-div"
          ),

          document.querySelector(
            ".ui-autocomplete"
          ),

          document.querySelector(
            ".ptw-autocomplete"
          ),

          document.querySelector(
            ".pax-selector"
          ),

          document.querySelector(
            ".rooms-container"
          )
        ].forEach(
          function (element) {
            height =
              Math.max(
                height,
                visibleBottom(
                  element
                )
              );
          }
        );

        /*
          Medimos también hijos directos
          porque PriceRes agrega nodos de
          forma dinámica.
        */
        var root =
          document.getElementById(
            "priceres-root"
          );

        if (root) {
          Array.prototype.forEach.call(
            root.querySelectorAll(
              ".bookerBox > *, #ptw-container > *"
            ),
            function (element) {
              height =
                Math.max(
                  height,
                  visibleBottom(
                    element
                  )
                );
            }
          );
        }

        return Math.min(
          Math.max(
            Math.ceil(
              height + 12
            ),
            200
          ),
          1200
        );
      }

      function sendHeight() {
        animationFrame = null;

        window.parent.postMessage(
          {
            source:
              "PriceResWidget",

            type:
              "PRICERES_RESIZE",

            height:
              calculateHeight()
          },
          "*"
        );
      }

      function requestHeightSoon() {
        if (animationFrame) {
          cancelAnimationFrame(
            animationFrame
          );
        }

        animationFrame =
          requestAnimationFrame(
            sendHeight
          );
      }

      /*
        =====================================================
        OBSERVAR CAMBIOS
        =====================================================
      */

      var observer =
        new MutationObserver(
          requestHeightSoon
        );

      observer.observe(
        document.documentElement,
        {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: [
            "class",
            "style",
            "src"
          ]
        }
      );

      window.addEventListener(
        "resize",
        requestHeightSoon
      );

      window.addEventListener(
        "load",
        requestHeightSoon
      );

      document.addEventListener(
        "click",
        function () {
          setTimeout(
            requestHeightSoon,
            0
          );

          setTimeout(
            requestHeightSoon,
            150
          );

          setTimeout(
            requestHeightSoon,
            400
          );
        }
      );

      document.addEventListener(
        "focusin",
        function () {
          setTimeout(
            requestHeightSoon,
            100
          );
        }
      );

      /*
        =====================================================
        INICIO
        =====================================================
      */

      function initialize() {
        if (!window.jQuery) {
          setTimeout(
            initialize,
            50
          );

          return;
        }

        window.jQuery(
          function () {
            loadSlide();
            loadBooker();

            requestHeightSoon();
          }
        );
      }

      initialize();

    })();
  <\/script>

</body>
</html>`;
}

export default function PriceResWidget({
  section,
  showCarousel = true,
  title = "Buscador de viajes",
  minHeight = 500,
  className = "",
}) {
  const iframeRef = useRef(null);

  const initialSection =
    section !== undefined ? normalizeSection(section) : getReactHash();

  const [activeSection, setActiveSection] = useState(initialSection);

  const [height, setHeight] = useState(minHeight);

  /*
    Mantener sincronizado el hash
    de React con PriceRes.
  */
  useEffect(() => {
    if (section !== undefined) {
      setActiveSection(normalizeSection(section));

      return undefined;
    }

    const onHashChange = () => {
      setActiveSection(getReactHash());
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [section]);

  const srcDoc = useMemo(
    () => createDocument(activeSection, showCarousel),
    [activeSection, showCarousel],
  );

  /*
    Ajustar altura según contenido
    real del iframe.
  */
  useEffect(() => {
    const onMessage = (event) => {
      const iframe = iframeRef.current;

      if (!iframe) return;

      if (event.source !== iframe.contentWindow) {
        return;
      }

      if (
        event.data?.source !== "PriceResWidget" ||
        event.data?.type !== "PRICERES_RESIZE"
      ) {
        return;
      }

      const nextHeight = Number(event.data.height);

      if (!Number.isFinite(nextHeight)) {
        return;
      }

      setHeight(Math.max(minHeight, Math.min(Math.ceil(nextHeight), 1200)));
    };

    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [minHeight]);

  return (
    <div
      className={`w-full bg-transparent ${className}`.trim()}
      style={{
        margin: 0,
        padding: 0,
        border: 0,
        background: "transparent",
      }}
    >
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        title={title}
        scrolling="no"
        frameBorder="0"
        allowTransparency
        className="block w-full border-0 bg-transparent"
        style={{
          display: "block",

          width: "100%",
          maxWidth: "100%",

          height: `${height}px`,

          margin: 0,
          padding: 0,

          border: 0,
          outline: 0,

          overflow: "hidden",

          background: "transparent",
        }}
      />
    </div>
  );
}
