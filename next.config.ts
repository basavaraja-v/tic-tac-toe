import type { NextConfig } from "next";
import { baseURL } from "./baseUrl";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: baseURL,
};

export default nextConfig;
