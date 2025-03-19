const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			saffron: {
  				'100': '#332702',
  				'200': '#654f05',
  				'300': '#987607',
  				'400': '#cb9e0a',
  				'500': '#f4c113',
  				'600': '#f6cd44',
  				'700': '#f8d973',
  				'800': '#fbe6a1',
  				'900': '#fdf2d0',
  				DEFAULT: '#F4C113'
  			},
  			white: {
  				'100': '#333333',
  				'200': '#666666',
  				'300': '#999999',
  				'400': '#cccccc',
  				'500': '#ffffff',
  				'600': '#ffffff',
  				'700': '#ffffff',
  				'800': '#ffffff',
  				'900': '#ffffff',
  				DEFAULT: '#FFFFFF'
  			},
  			light_red: {
  				'100': '#480000',
  				'200': '#910000',
  				'300': '#d90000',
  				'400': '#ff2323',
  				'500': '#ff6b6b',
  				'600': '#ff8989',
  				'700': '#ffa6a6',
  				'800': '#ffc4c4',
  				'900': '#ffe1e1',
  				DEFAULT: '#FF6B6B'
  			},
  			ut_orange: {
  				'100': '#361a02',
  				'200': '#6d3503',
  				'300': '#a34f05',
  				'400': '#da6907',
  				'500': '#f8851f',
  				'600': '#f99d4d',
  				'700': '#fbb679',
  				'800': '#fccea6',
  				'900': '#fee7d2',
  				DEFAULT: '#F8851F'
  			},
  			vermilion: {
  				'100': '#3d0000',
  				'200': '#7a0000',
  				'300': '#b80000',
  				'400': '#f50000',
  				'500': '#ff3131',
  				'600': '#ff5c5c',
  				'700': '#ff8585',
  				'800': '#ffadad',
  				'900': '#ffd6d6',
  				DEFAULT: '#FF3131'
  			},
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
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
});

