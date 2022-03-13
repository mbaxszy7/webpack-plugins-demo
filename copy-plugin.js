const fs = require("fs-extra");
const fg = require("fast-glob");
const path = require("path");

class CopyPlugin {
  constructor(options) {
    this.options = options;
  }
  copyFile(src, dest, ignore = []) {
    fs.copy(src, dest, {
      // 拷贝时忽略文件
      filter(path) {
        // 如果未指定过滤文件，则全部复制
        if (!ignore.length) return true;
        return ignore.every((item) => !path.endsWith(item));
      },
    });
  }

  apply(compiler) {
    // 内容输出到 output.path 后触发 afterEmit 钩子
    compiler.hooks.afterEmit.tapAsync(
      "CopyPlugin",
      async (compilation, callback) => {
        const { from, to = "/dist" } = this.options;

        // 如果未指定 from
        if (!from) {
          callback();
          return;
        }

        // 根据 context 获取源文件/目录
        const src = path.join(compiler.context, from);

        // 获取目标目录
        // 判断 to 是否指定
        const dest = to
          ? path.join(compiler.context, to)
          : compilation.outputOptions.path;

        try {
          // 获取忽略文件
          let ignoreFiles = [];
          if (this.options.ignore?.length)
            ignoreFiles = await fg(this.options.ignore, {
              dot: true,
              cwd: src,
            });
          await this.copyFile(src, dest, ignoreFiles);
        } catch (error) {
          compilation.errors.push(error);
        }

        callback();
      }
    );
  }
}

module.exports = CopyPlugin;
