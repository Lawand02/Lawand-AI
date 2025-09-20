/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2B5D3A',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#4A90E2',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: '#F5A623',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				// Matrix theme colors
				'matrix': {
					'void': '#000000',
					'neon': '#00ff00',
					'muted': '#00bb00',
					'terminal': '#00dd00',
					'subtle': '#0a0a0a',
				},
			},
			fontFamily: {
				'matrix': ['VT323', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				// Matrix animations
				'glow': {
					'0%': { 'text-shadow': '0 0 5px #00ff00, 0 0 10px #00ff00' },
					'100%': { 'text-shadow': '0 0 20px #00ff00, 0 0 30px #00ff00' },
				},
				'blink': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0' },
				},
				'glitch': {
					'0%': { 'text-shadow': '1px 0 0 #ff0000, -1px 0 0 #00ffff' },
					'50%': { 'text-shadow': '-1px 0 0 #ff0000, 1px 0 0 #00ffff' },
					'100%': { 'text-shadow': '1px 0 0 #ff0000, -1px 0 0 #00ffff' },
				},
				'rain': {
					'0%': { transform: 'translateY(-100vh)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(100vh)', opacity: '0' },
				},
				'typing': {
					'0%': { width: '0' },
					'100%': { width: '100%' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'blink': 'blink 1s infinite',
				'glitch': 'glitch 0.5s infinite',
				'rain': 'rain 3s linear infinite',
				'typing': 'typing 3s steps(30, end)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}