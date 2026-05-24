/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cactus: {
          black: "#000000",
          orange: "#eb8d1d",
          green: "#4fb070",
          bg: "#f7faf7"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.09)"
      }
    }
  },
  plugins: []
};
