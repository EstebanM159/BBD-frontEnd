/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    },
    colors:{
         'ship-gray': {
        '50': '#f7f7f8',
        '100': '#efeef0',
        '200': '#dbdadd',
        '300': '#bdbabf',
        '400': '#97949c',
        '500': '#7b7780',
        '600': '#646069',
        '700': '#524f55',
        '800': '#464349',
        '900': '#3d3b3f',
        '950': '#28272a',
    },
    'nevada': {
        '50': '#f4f5f7',
        '100': '#e4e7e9',
        '200': '#ccd1d5',
        '300': '#a8b1b8',
        '400': '#7d8993',
        '500': '#5e6a74',
        '600': '#545d66',
        '700': '#484f56',
        '800': '#40454a',
        '900': '#383b41',
        '950': '#232529',
    },
    'envy': {
        '50': '#f5f8f6',
        '100': '#dfe8e2',
        '200': '#c0cfc6',
        '300': '#94ad9f',
        '400': '#728f7f',
        '500': '#587466',
        '600': '#455c51',
        '700': '#3a4b43',
        '800': '#313e38',
        '900': '#2b3631',
        '950': '#161d1a',
    },
    'jet-stream': {
        '50': '#f5f8f7',
        '100': '#e8f0ec',
        '200': '#d2e0da',
        '300': '#b7cdc3',
        '400': '#83a595',
        '500': '#608775',
        '600': '#4c6d5e',
        '700': '#3e574c',
        '800': '#34473e',
        '900': '#2c3b35',
        '950': '#151e1b',
    },
    'bianca': {
        '50': '#f8f7ef',
        '100': '#f2f0e2',
        '200': '#e4e0c4',
        '300': '#d3cb9e',
        '400': '#c1b176',
        '500': '#b49d5b',
        '600': '#a68a50',
        '700': '#8b7043',
        '800': '#715b3b',
        '900': '#5c4b32',
        '950': '#312619',
    },
    
    
    
    }
  },
  plugins: [],
}

