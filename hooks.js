const webpack = require("webpack");
const config = require("./webpack.config.js");

const compiler = webpack(config);

Object.keys(compiler.hooks).forEach((hookName) => {
  if (compiler.hooks[hookName].tap) {
    compiler.hooks[hookName].tap("anyString", () => {
      console.log(`hook -> ${hookName}`);
    });
  }
});
compiler.run();
