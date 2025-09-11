import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizeCss: false,
    },
    allowedDevOrigins: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://*.ngrok-free.app",
    ],
};

export default nextConfig;

