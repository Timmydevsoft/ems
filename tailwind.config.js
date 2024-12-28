/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        sidebar: "#f0f4f4",
        overview: "#247b7b",
        logobi: "#247B7B ",
        logobii: "#3B247B",
        bacground: "#fffffa",
        help: "#666666",
        name: "#333333",
        allcheader: "#455454",
        active: "#009918",
        dark: "#000000",
        red: "#990000",
        form:"#999999"

      }
    },
  },
  plugins: [],
}

