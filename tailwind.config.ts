
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      spacing: {
        'golden-sm': 'calc(1rem / 1.618)',
        'golden-md': 'calc(1rem * 1.618)',
        'golden-lg': 'calc(1rem * 1.618 * 1.618)',
        'golden-xl': 'calc(1rem * 1.618 * 1.618 * 1.618)',
      },
      height: {
        'golden-screen': '61.8vh',
        'golden-screen-inverse': '38.2vh',
      },
      width: {
        'golden-screen': '61.8vw',
        'golden-screen-inverse': '38.2vw',
      },
      aspectRatio: {
        'golden': '1.618',
        'golden-inverse': '0.618',
      },
      fontSize: {
        'golden-xs': 'calc(0.75rem / 1.618)',
        'golden-sm': 'calc(0.875rem / 1.618)',
        'golden-base': '1rem',
        'golden-lg': 'calc(1.125rem * 1.618)',
        'golden-xl': 'calc(1.25rem * 1.618)',
        'golden-2xl': 'calc(1.5rem * 1.618)',
        'golden-3xl': 'calc(1.875rem * 1.618)',
      },
      lineHeight: {
        'golden': '1.618',
        'golden-tight': 'calc(1.25 * 1.618)',
        'golden-loose': 'calc(2 * 1.618)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        brand: {
          light: "#1a1a1a",
          dark: "#ffffff",
          accent: "#8E9196",
          gray: "#86868b",
          silver: "#333333",
          red: "#ff8ba7",
          gradient: {
            start: "#ff8ba7",
            middle: "#ffc6c7",
            end: "#fae3d9"
          }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'fade-controls': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'parallax-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-controls': 'fade-controls 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'parallax-slow': 'parallax-slow 20s ease-in-out infinite'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
