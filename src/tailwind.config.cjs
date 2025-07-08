/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          fancy: ['"Dancing Script"', 'cursive'],
          body: ['"Open Sans"', 'sans-serif'],
        },
        colors: {
          primary: '#A78BFA',
          secondary: '#FDE68A',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  