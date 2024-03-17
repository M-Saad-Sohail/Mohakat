/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        'primary': '#792532',
      },
      screens: {
        '2xl': '1700px',
        '3xl': '1800px',
      },
      boxShadow: {
        'custom': '0 4px 8px 0 rgba(121, 37, 50, 0.6)',
      },
      borderColor: {
        'main': '#792532',
      },
      outline: {
        'main': '#792532',
      },
      borderRadius: {
        'large': '15px',
        'md': '4px',
        'lg': '10px',
      },
      colors: {
        'primary': '#792532',
        'red': '#ff0002',
      },
      
    },
    screens: {
      mobile: { max: '767px' },
      tablet: { max: '1280px' },
      laptop: { max: '1499px' },
    },
    
  },
  plugins: [],
}

