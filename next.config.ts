import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* .mdx is listed so note bodies compile; pages themselves stay .tsx. */
  pageExtensions: ["ts", "tsx", "mdx"],

  /*
   * /examples and /showcase were two pages making the same offer — "here is a
   * thing you can operate" — and the nav asked visitors to guess which. The
   * demos moved into /showcase; the old URL keeps working and hands its search
   * equity over rather than 404ing.
   */
  redirects: async () => [{ source: "/examples", destination: "/showcase", permanent: true }],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
