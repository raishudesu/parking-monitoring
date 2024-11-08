const { WorkboxPlugin } = require("workbox-webpack-plugin");

module.exports = {
  experimental: {
    // ...
    serviceWorker: {
      // ...
      // Add the Workbox configuration
      workboxOptions: {
        exclude: [/swagger-ui/],
      },
    },
  },
  // ...
};
