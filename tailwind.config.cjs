
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // if we find base font is an issue on many sites.. static?
      // fontSize: {
      //   sm: '14px',
      //   base: '16px',
      //   xl: '20px',
      //   '2xl': '24px',
      //   '3xl': '30px',
      //   '4xl': '36px',
      //   '5xl': '48px',
      //   '6xl': '60px',
      //   '7xl': '72px',
      //   '8xl': '96px',
      //   '9xl': '128px',
      // },
      textColor: {
        skin: {
          primary: withOpacity("--color-primary"),
          a11y: withOpacity("--color-a11y"),
        },
      },
      backgroundColor: {
        skin: {
          primary: withOpacity("--color-primary"),
          a11y: withOpacity("--color-a11y"),
        },
      },
      ringColor: {
        skin: {
          primary: withOpacity("--color-primary"),
        },
      },
      borderColor: {
        skin: {
          primary: withOpacity("--color-primary"),
          a11y: withOpacity("--color-a11y"),
        },
      },
    },
  },
  plugins: [],
}
