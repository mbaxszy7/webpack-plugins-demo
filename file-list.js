const fs = require("fs");
const path = require("path");
class CopyPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync(
      "FileList",
      async (compilation, callback) => {
        let content = {};

        Object.entries(compilation.assets).forEach(([pathname, source]) => {
          content[pathname] = `${source.size()} bytes`;
        });

        const { filename = "file-list.json" } = this.options;
        fs.writeFile(
          path.join(compilation.outputOptions.path, filename),
          JSON.stringify(content),
          () => {
            callback();
          }
        );
      }
    );
  }
}

module.exports = CopyPlugin;
