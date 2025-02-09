import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'azul': '#4070cf',
        'azul-oscuro': '#3965bb',
        'gris-muy-claro': '#ECECEC',
        'gris-claro': '#DDDDDD',
        'gris': '#707070',
        'gris-oscuro': '#898989',
        'gris-muy-oscuro': '#BFBFBF',
        'negro-opaco': '#1C1C1C',
        'negro-medio': '#3a3a3a',
        'negro-claro': '#555555',
        'rojo': '#D45252',
        'verde': '#34B45E'
      },
    },
  },
  plugins: [],
} satisfies Config;
