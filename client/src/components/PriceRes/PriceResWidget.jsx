import { useMemo } from "react";

export default function PriceResWidget() {
  const html = useMemo(
    () => `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <!-- Fuerza que enlaces y formularios salgan del iframe -->
  <base target="_top" />

  <link
    rel="stylesheet"
    type="text/css"
    href="https://b2b2c.cdnpt.com/viaja-a-tu-destino/css/custom.css"
  />

  <style>
    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100%;
      background: transparent;
      overflow: hidden;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    #ptw-container {
      width: 100%;
      min-height: 100%;
    }
  </style>
</head>

<body>
  <div id="ptw-container" class="ptw-horizontal-search"></div>

  <script
    async
    type="text/javascript"
    src="https://widgets.priceres.com.mx/viaja-a-tu-destino/jsonpBooker/startWidget?container=ptw-container&UseConfigs=false&IsHorizontal=true">
  </script>
</body>
</html>
`,
    [],
  );

  return (
    <iframe
      title="Buscador de viajes"
      srcDoc={html}
      className="block w-full"
      style={{
        width: "100%",
        height: "380px",
        border: "none",
        background: "transparent",
      }}
      loading="eager"
    />
  );
}
