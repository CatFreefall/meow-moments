/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    screens: {
      mobile: "768px",
      desktop: "1537px",
    },
    extend: {
      fontFamily: {
        header: ["Fredoka", "sans-serif"],
        body: ["Quicksand", "sans-serif"],
      },
      colors: {
        darkgrey: "#2B303A",
        lightgrey: "#40454E",
        white: "#F1F4E9",
        blue: "#3B8CF6",
        darkblue: "#1E6FD9",
        orange: "#F77000",
        green: "#23A923",
      },
      spacing: {
        18: "4.5rem",
        140: "35rem",
      },
    },
  },
  plugins: [],
};
