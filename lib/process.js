var TITLE_RE = /<title>(.*)<\/title>/;

function buildItems(inItems) {
  return inItems.map(function (item) {
    return '<link rel="dns-prefetch" href="' + item + '" />';
  });
}

module.exports = function (inItems, inData, inCallback) {
  if (inItems.length > 0) {
    var html = inData.html;
    var replacer = '<title>($1)</title>\n' + buildItems(inItems) + '\n';

    inData.html = html.replace(TITLE_RE, replacer);
  }
  inCallback(null, inData);
};
