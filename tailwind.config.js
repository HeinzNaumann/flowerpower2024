/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './plugins/**/*.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                flowerPowerLila: '#a00080',
                secondary: '#ff4500',
            },
            fontFamily: {
                'GelatoScript': ["GelatoScript", "sans-serif"],
                'rubik': ["Rubik", "sans-serif"],
            },
            screens: {
                'sm': '640px',
                'md': '1024px',
                'lg': '1025px',
            },
        },
    },
    plugins: [],
};