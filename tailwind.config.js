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
      textColor:{
        primary:"#792532",
       
      },
      screens: {
        "2xl": "1700px",
        "3xl": "1800px",
      },
      borderColor: {
        main: "#792532",
      },
      outlineColor: {
        main: "#792532",
      },
      borderRadius: {
        large: "15px",
        md: "5px",
        lg: "10px",
      },
      colors: {
        primary: "#792532",
        red: "#ff0002",
        
      },
     
   
    },
  },
  plugins: [],
}

