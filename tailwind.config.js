/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2A0E44', 
                color_white:'#F7F7F7',
                primary_400:'#521B84',
                neutral_400: '#636363',
                neutral_500: '#1f1f1f',
            },
        
        },
    },
    plugins: [],
};
  