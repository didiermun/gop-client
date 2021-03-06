const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'media', // or 'media' or 'class'
    theme: {
      fontFamily: {
        side: 'Roboto',
      },
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
};
