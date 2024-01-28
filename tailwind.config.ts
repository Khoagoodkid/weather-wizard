import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
          "home-bg" : 'url("https://i.pinimg.com/originals/3e/4e/01/3e4e010869c36e5c1c47a5b203fb74ee.gif")'
      },
    },
  },
  plugins: [],
};
export default config;
