export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#3f3f46",
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#d4d4d8",
          300: "#a1a1aa",
          400: "#71717a",
          500: "#52525b",
          600: "#3f3f46",
          700: "#27272a",
          800: "#18181b",
          900: "#09090b",
        },
        ink: "#09090b",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        navy: "0 4px 30px rgba(39,39,42,0.28)",
        "navy-lg": "0 10px 50px rgba(39,39,42,0.38)",
      },
      keyframes: {
        pop: {
          "0%": { opacity: 0, transform: "translateY(20px) scale(.96)" },
          "100%": { opacity: 1, transform: "none" },
        },
        fadein: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        floatUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        pop: "pop .6s cubic-bezier(.2,.7,.2,1) both",
        fadein: "fadein .3s ease both",
        floatUp: "floatUp .4s ease-out both",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
