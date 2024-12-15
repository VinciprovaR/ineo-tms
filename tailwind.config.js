module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        "custom-pulse": "pulse-custom 1.5s ease-in-out infinite",
      },
      keyframes: {
        "pulse-custom": {
          "0%": { opacity: "0.5", transform: "scale(0.98)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
          "100%": { opacity: "0.5", transform: "scale(0.98)" },
        },
      },
    },
  },
  plugins: [],
};
