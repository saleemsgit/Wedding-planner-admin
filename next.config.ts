import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typedRoutes disabled: dynamic admin links (e.g. /admin/vendors/${id}/edit)
  // are built from runtime values, which the typed-routes checker rejects.
  typedRoutes: false,
};

export default nextConfig;
