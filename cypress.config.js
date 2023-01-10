const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    "experimentalStudio": true,
    "experimentalSessionAndOrigin": true
  },
  projectId: "nou19j",
  env: {
    username: "amier1234@hotmail.com",
    password: "amier123!"
  }

});
