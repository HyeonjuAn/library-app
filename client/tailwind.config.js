/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                'lblue': '#424a59'
            }
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["dracula"],
    },
};
