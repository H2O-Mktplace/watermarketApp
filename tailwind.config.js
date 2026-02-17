/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
                dark: 'var(--color-dark)',
                background: 'var(--color-background)',
                surface: 'var(--color-surface)',
                border: 'var(--color-border)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                outfit: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
