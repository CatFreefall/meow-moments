/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        header: ["Fredoka", "sans-serif"],
        body: ["Quicksand", "sans-serif"],
      },
      height: {
        "7/8": "87.5%",
        "9/10": "90%",
      },
      colors: {
        darkgrey: "#2B303A",
        lightgrey: "#40454E",
        white: "#F1F4E9",
        blue: "#3B8CF6",
        darkblue: "#1E6FD9",
        orange: "#F77000",
        green: "#23A923",
        red: "#F74F4F",
      },
      spacing: {
        18: "4.5rem",
        15: "3.75rem",
        140: "35rem",
      },
    },
  },
  plugins: [],
};
