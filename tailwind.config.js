/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            tile: {
                light: "#e5e7eb",
                mid: "#d1d5db",
                dark: "#9ca3af",
                red: "#F7C8E0",
                blue: "#B4E4FF",
                green: "#DFFFD8"
            },
            black: "#000000",
            one: "#0000FF",
            two: "#008200",
            three: "#FF0000",
            four: "#000084",
            five: "#840000",
            six: "#008284",
            seven: "#840084",
            eight: "#757575"
        }
    },
    plugins: []
}
