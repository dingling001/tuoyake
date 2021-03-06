"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    // proxyTable: {},

    // Various Dev Server settings
    // host: "localhost", // can be overwritten by process.env.HOST
    host: "0.0.0.0",
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: true,
    env: require('./dev.env'),
    proxyTable: {
      '/api': {
        target: 'http://admin.tuoyake.com/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api"
        }
      }
    },
  },
  build: {
    // Template for index.html
    // index: path.resolve(__dirname, '../dist/index.html'),
    index: path.resolve(__dirname, "../dist/index.html"),
    template: path.resolve(__dirname, "../index.html"),
    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "app",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // publish: {
  //   // Template for index.html
  //   // index: path.resolve(__dirname, '../dist/index.html'),
  //   index: path.resolve(__dirname, "../dist/wap_home_online.blade.php"),
  //   template: path.resolve(__dirname, "../wap_home_online.blade.php"),
  //   // Paths
  //   assetsRoot: path.resolve(__dirname, "../dist"),
  //   assetsSubDirectory: "wapp_online",
  //   assetsPublicPath: "/",
  //
  //   /**
  //    * Source Maps
  //    */
  //
  //   productionSourceMap: true,
  //   // https://webpack.js.org/configuration/devtool/#production
  //   devtool: "#source-map",
  //
  //   // Gzip off by default as many popular static hosts such as
  //   // Surge or Netlify already gzip all static assets for you.
  //   // Before setting to `true`, make sure to:
  //   // npm install --save-dev compression-webpack-plugin
  //   productionGzip: false,
  //   productionGzipExtensions: ["js", "css"],
  //
  //   // Run the build command with an extra argument to
  //   // View the bundle analyzer report after build finishes:
  //   // `npm run build --report`
  //   // Set to `true` or `false` to always turn it on or off
  //   bundleAnalyzerReport: process.env.npm_config_report
  // }
};
