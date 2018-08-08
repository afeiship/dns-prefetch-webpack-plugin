var objectAssign = require('object-assign');
var process = require('./lib/process');
var RETURN_VALUE = function (inValue) { return inValue };
var DEFAULT_FORMAT = 'tar';

/**
 * Configure the plugin
 * @param {Options} inOptions
 */
function DnsPrefetchWebpackPlugin(inOptions) {
  var options = objectAssign({
    format: DEFAULT_FORMAT,
    returnValue: RETURN_VALUE
  }, inOptions);

  this.options = options;
}


/**
 * Implement the plugin
 */
DnsPrefetchWebpackPlugin.prototype.apply = function (compiler) {
  var self = this;
  var processer = function (data, callback) {
    replacements.forEach(function (replacement) {
      data.html = replacement(data.html);
    });
    callback(null, data);
  };

  if (compiler.hooks) {
    // webpack >=4.0
    compiler.hooks.emit.tap('DnsPrefetchWebpackPlugin', function (compilation) {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('DnsPrefetchWebpackPlugin', processer);
    });
  } else {
    // webpack < 4.0:
    compiler.plugin('emit', function (compilation) {
      compilation.plugin('html-webpack-plugin-before-html-processing', processer);
    });
  }
};

module.exports = DnsPrefetchWebpackPlugin;
