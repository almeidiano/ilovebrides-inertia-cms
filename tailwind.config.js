/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui"

export default {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
        './resources/**/*.ts',
        './resources/**/*.tsx',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        daisyui
    ],
    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#a991f7",
                    "secondary": "#f6d860",
                    "accent": "#37cdbe",
                    "neutral": "#3d4451",
                    "base-100": "#ffffff",
                    // Adicione outras cores personalizadas aqui
                },
            },
            "light", // Certifique-se de que o tema claro está listado aqui
        ],
    }
}
