module.exports = {
  components: {
    files: {
      'test/build/ko.js': ['test/index.js']
    },
    options: {
      alias: [
        'bower_components/knockout/dist/knockout.debug.js:knockout',
        'bower_components/knockout-postbox/build/knockout-postbox.js:knockout-postbox'
      ],
      bundleOptions: {
        // debug: true,
        standalone: 'ko'
      },
      transform: ['jadeify']
    }
  }
};
