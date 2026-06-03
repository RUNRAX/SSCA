import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-teal': 'var(--color-accent-teal)',
        'accent-blue': 'var(--color-accent-blue)',
        'accent-purple': 'var(--color-accent-purple)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
