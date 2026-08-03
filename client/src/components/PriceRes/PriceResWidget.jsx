import { useMemo } from "react";

export default function PriceResWidget() {
  const iframeContent = useMemo(
    () => `
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <!-- Abre los resultados en la pestaña actual -->
  <base target="_top" />
</head>

<body>
  <div
    id="ptw-container"
    class="ptw-horizontal-search bookerContainer"
  ></div>

  <!-- Dependencia utilizada por PriceRes -->
  <script
    src="https://sc.cdnpt.com/general/js/1.0f/jquery-1.12.4.min.js"
  ></script>

  <script>
    (function () {
      function forceTopNavigation() {
        document.querySelectorAll("form").forEach(function (form) {
          form.setAttribute("target", "_top");
        });

        document.querySelectorAll("a[href]").forEach(function (link) {
          link.setAttribute("target", "_top");
        });
      }

      /*
       * PriceRes crea el formulario dinámicamente.
       * El observador aplica target="_top" cuando aparezca.
       */
      const observer = new MutationObserver(function () {
        forceTopNavigation();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      /*
       * Refuerzo antes de enviar cualquier formulario.
       */
      document.addEventListener(
        "submit",
        function (event) {
          const form = event.target;

          if (form instanceof HTMLFormElement) {
            form.setAttribute("target", "_top");
          }
        },
        true
      );

      /*
       * Refuerzo para el botón de búsqueda.
       */
      document.addEventListener(
        "click",
        function (event) {
          const element = event.target;

          if (!(element instanceof Element)) {
            return;
          }

          const submitButton = element.closest(
            ".ap_booker_submit"
          );

          if (submitButton) {
            const form = submitButton.closest("form");

            if (form) {
              form.setAttribute("target", "_top");
            }
          }

          const link = element.closest("a[href]");

          if (link) {
            link.setAttribute("target", "_top");
          }
        },
        true
      );

      /*
       * Si PriceRes llama window.open(), también
       * reemplaza la pestaña actual.
       */
      const originalWindowOpen = window.open;

      window.open = function (url) {
        if (url) {
          window.top.location.href = url;
        }

        return window.top;
      };

      /*
       * Carga el widget después de que jQuery
       * y #ptw-container estén disponibles.
       */
      const widgetScript = document.createElement("script");

      widgetScript.type = "text/javascript";
      widgetScript.async = true;
      widgetScript.src =
        "https://widgets.priceres.com.mx/viaja-a-tu-destino/jsonpBooker/startWidget?container=ptw-container&UseConfigs=false&IsHorizontal=true";

      widgetScript.onload = function () {
        forceTopNavigation();
      };

      widgetScript.onerror = function () {
        console.error(
          "No fue posible cargar el widget de PriceRes."
        );
      };

      document.body.appendChild(widgetScript);
    })();
  </script>
</body>
</html>
`,
    [],
  );

  return (
    <iframe
      title="Buscador de viajes"
      srcDoc={iframeContent}
      sandbox={[
        "allow-scripts",
        "allow-forms",
        "allow-same-origin",
        "allow-popups",
        "allow-top-navigation",
      ].join(" ")}
      className="block w-full border-0 md:h-[450px]"
      loading="eager"
    />
  );
}
