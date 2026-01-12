import { CURATED_PALETTES } from "@/lib/data";
import { BLOG_POSTS } from "@/lib/posts";

export default function sitemap() {
  const baseUrl = "https://paletto.viktoor.ru";

  const staticRoutes = [
    "",
    "/palette-generator",
    "/explore",
    "/wheel",
    "/visualizer",
    "/contrast-checker",
    "/image-to-palette",
    "/gradient-maker",
    "/font-styler",
    "/popular-colors",
    "/color-names",
    "/about",
    "/blog",
    "/contacts",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  // Динамические страницы палитр
  const paletteRoutes = CURATED_PALETTES.map((palette) => ({
    url: `${baseUrl}/palette/${palette.name.toLowerCase().replace(/ /g, "-")}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...paletteRoutes];
}
