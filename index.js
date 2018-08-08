var objectAssign = require('object-assign');
var process = require('./lib/process');


/**
 * Configure the plugin
 * @param {Options} inOptions
 */
function DnsPrefetchWebpackPlugin(inOptions) {
  var options = objectAssign({
    items: [],
  }, inOptions);

  this.options = options;
}


/**
 * Implement the plugin
 */
DnsPrefetchWebpackPlugin.prototype.apply = function (compiler) {
  var items = this.options.items;
  var processer = function (data, callback) {
    process(items, data, callback);
  };

  if (compiler.hooks) {
    // webpack >=4.0
    compiler.hooks.compilation.tap('DnsPrefetchWebpackPlugin', function (compilation) {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('DnsPrefetchWebpackPlugin', processer);
    });
  } else {
    // webpack < 4.0:
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-before-html-processing', processer);
    });
  }
};

module.exports = DnsPrefetchWebpackPlugin;
