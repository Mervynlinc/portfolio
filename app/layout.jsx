import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://mervyn.dev"),
  title: "Namanya Mervyn — Software Engineer",
  description:
    "Namanya Mervyn is a software engineer building thoughtful digital products across web, mobile, and DevOps.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.4.0/model-viewer.min.js"
          type="module"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
