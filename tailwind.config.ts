import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
		fontFamily: {
			sans: ['var(--font-sans)', 'sans-serif'],
			jakarta: ['var(--font-plus-jakarta-sans)', 'sans-serif']
		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'slide-up': {
  				'0%': {
  					transform: 'translateY(0em)'
  				},
  				'15%': {
  					transform: 'translateY(0em)'
  				},
  				'20%': {
  					transform: 'translateY(-1em)'
  				},
  				'45%': {
  					transform: 'translateY(-1em)'
  				},
  				'50%': {
  					transform: 'translateY(-2em)'
  				},
  				'80%': {
  					transform: 'translateY(-2em)'
  				},
  				'85%': {
  					transform: 'translateY(-3em)'
  				},
  				'100%': {
  					transform: 'translateY(-3em)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
			'accordion-up': {
				from: {
					height: 'var(--radix-accordion-content-height)'
				},
				to: {
					height: '0'
				}
			},
			'voice-in-up': {
				'0%': {
					opacity: '0',
					transform: 'translateY(32px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			},
			'voice-in-down': {
				'0%': {
					opacity: '0',
					transform: 'translateY(-32px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			}
		},
		animation: {
			'slide-up': 'slide-up 10s infinite',
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'voice-in-up': 'voice-in-up 450ms cubic-bezier(0.22, 1, 0.36, 1) both',
			'voice-in-down': 'voice-in-down 450ms cubic-bezier(0.22, 1, 0.36, 1) both'
		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
