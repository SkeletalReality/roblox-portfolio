/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 */
await import("./src/env.js");

import WithPWA from "next-pwa";

const repoName = "roblox-portfolio"; // 👈 CHANGE IF NEEDED

const withPWA = WithPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",

  // ✅ PWA must respect basePath on GitHub Pages
  register: true,
  scope: `/${repoName}/`,
  sw: "service-worker.js",
});

/**
 * @type {import('next').NextConfig}
 */
// @ts-ignore
const config = withPWA({
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // ✅ REQUIRED for GitHub Pages
  output: "export",

  // ✅ REQUIRED: GitHub Pages has no image optimizer
  images: {
    unoptimized: true,
  },

  // ✅ CRITICAL FIX (this was missing)
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,

  // ❌ i18n must stay disabled with appDir + export
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
});

export default config;
