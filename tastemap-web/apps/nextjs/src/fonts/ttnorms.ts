import localFont from "next/font/local";

const ttnorms = localFont({
  src: [
    {
      path: "./TTNorms/TT-Norms-Pro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./TTNorms/TT-Norms-Pro-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./TTNorms/TT-Norms-Pro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./TTNorms/TT-Norms-Pro-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./TTNorms/TT-Norms-Pro-Medium-Italic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./TTNorms/TT-Norms-Pro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ttnorms",
});

export default ttnorms;
