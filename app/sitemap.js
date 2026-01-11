import { CURATED_PALETTES } from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://paletto.viktoor.ru";

  // Статические страницы
  const routes = [
    "",
    "/palette-generator",
    "/explore",
    "/wheel",
    "/visualizer",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Динамические страницы палитр
  const paletteRoutes = CURATED_PALETTES.map((palette) => ({
    url: `${baseUrl}/palette/${palette.name.toLowerCase().replace(/ /g, "-")}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...paletteRoutes];
}
