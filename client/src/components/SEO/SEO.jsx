import { useEffect } from "react";

function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  noindex = false,
}) {
  useEffect(() => {
    if (!title) return;

    const siteName = "Viaja a tu Destino";

    const finalTitle = title.includes(siteName)
      ? title
      : `${title} | ${siteName}`;

    const finalDescription =
      description ||
      "Encuentra ofertas de hoteles, vuelos, paquetes y tours con Viaja a tu Destino.";

    const setMeta = (attribute, key, content) => {
      if (!content) return;

      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    const setCanonical = (href) => {
      if (!href) return;

      let canonical = document.head.querySelector('link[rel="canonical"]');

      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }

      canonical.setAttribute("href", href);
    };

    // TITLE
    document.title = finalTitle;

    // SEO NORMAL
    setMeta("name", "description", finalDescription);

    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    // CANONICAL
    setCanonical(url);

    // OPEN GRAPH
    setMeta("property", "og:title", finalTitle);
    setMeta("property", "og:description", finalDescription);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:site_name", siteName);

    if (image) {
      setMeta("property", "og:image", image);
      setMeta("property", "og:image:alt", title);
    }

    // TWITTER / X
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", finalTitle);
    setMeta("name", "twitter:description", finalDescription);

    if (image) {
      setMeta("name", "twitter:image", image);
    }
  }, [title, description, image, url, type, noindex]);

  return null;
}

export default SEO;
