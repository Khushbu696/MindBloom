/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6C63FF",
                accent: "#FF6584",
                calm: "#A3D9A5",
                dark: "#2B2B2B"
            }
        },
    },
    plugins: [],
}
