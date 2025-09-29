/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import WithPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // tells Next.js to export static HTML
  images: {
    unoptimized: true, // prevents Next Image errors on export
  },
};

const withPWA = WithPWA({
  dest: "public",
  disable: true,//process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "service-worker.js",
});

/**
 * @type {import('next').NextConfig}
 */
// @ts-ignore
const config = withPWA({
  output: 'export', // tells Next.js to export static HTML
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ skips type errors during build
  },

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  // i18n: {
  //   locales: ["en"],
  //   defaultLocale: "en",
  // },
});

export default config;