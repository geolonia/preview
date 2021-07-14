/**
 * normalize style ref
 * - basic, geolonia/basic, geolonia/basic/master -> geolonia/basic/master
 * - fallback master -> main if not exists
 * @returns string
 */
const getStyle = async () => {
  const defaultStyle = "geolonia/basic";
  const styleUrl = "https://raw.githubusercontent.com/%s/style.json";

  let style;

  const styleIdentifier = new URLSearchParams(location.search).get("style");
  if (styleIdentifier) {
    if (styleIdentifier.match(/^https:\/\//)) {
      style = styleIdentifier;
    } else {
      const stylePath = styleIdentifier
        .split(/\//)
        .filter((section) => !!section);
      if (stylePath.length === 1) {
        stylePath.unshift("geolonia");
        stylePath.push("master");
      } else if (stylePath.length === 2) {
        stylePath.push("master");
      }
      style = styleUrl.replace("%s", stylePath.join("/"));
    }
  } else {
    style = styleUrl.replace("%s", defaultStyle + "/master");
  }

  if (style.includes("/master/style.json")) {
    const response = await fetch(style, { method: "HEAD" });
    if (response.status > 399) {
      const fallbackedStyle = style.replace(
        "/master/style.json",
        "/main/style.json"
      );
      console.log(
        `[geolonia/preview] style ${style} is not found. Trying ${fallbackedStyle}..`
      );
      style = fallbackedStyle;
    }
  }

  return style;
};

const main = async () => {
  const style = await getStyle();

  const e = document.getElementById("map");
  e.dataset.style = style;

  const map = new geolonia.Map(document.getElementById("map"));

  window.addEventListener("hashchange", () => {
    const style = getStyle();
    map.setStyle(style);
  });

  map.on("load", () => {
    const dumpFeature = (event) => {
      const features = map.queryRenderedFeatures(event.point);
      console.log(features);
      const jsonContainer = document.getElementById("json");
      jsonContainer.innerText = JSON.stringify(features, null, "  ");
    };

    const mouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };

    const mouseLeave = () => {
      map.getCanvas().style.cursor = "";
    };

    map.getStyle().layers.forEach((item) => {
      map.on("click", item.id, dumpFeature);
      map.on("mouseenter", item.id, mouseEnter);
      map.on("mouseleave", item.id, mouseLeave);
    });
  });
};

main();
