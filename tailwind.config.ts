import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1A1A1A",
        mink: "#3D3D3D",
        linen: "#f7f7f5",
        porcelain: "#FFFFFF",
        gold: "#082e2b",
        coral: "#092E2B",
        sage: "#7f8a72"
      },
      fontFamily: {
        body: ["Noto Sans Elymaic", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(32, 28, 24, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
