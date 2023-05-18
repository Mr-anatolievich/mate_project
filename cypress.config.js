const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl: 'http://the-internet.herokuapp.com/login',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
