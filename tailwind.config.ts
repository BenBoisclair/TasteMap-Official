import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: { 600: "#956E00", DEFAULT: "#FFD14E" },
        neutral: {
          800: "#3F3F3F",
          600: "#6F6F6F",
          DEFAULT: "#F3F3F3",
          200: "#F6F4ED",
        },
        gray: "#E4E3DE",
        green: {
          600: "#045453",
          DEFAULT: "#33BFBE",
        },
        orange: { 600: "#EF4E3D", DEFAULT: "#EB5E2A" },
        blue: "#7F9ECE",
      },
      fontSize: {
        "2xs": "0.625rem",
        "3xs": "0.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
