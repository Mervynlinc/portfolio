export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://mervyn.dev/sitemap.xml",
  };
}
