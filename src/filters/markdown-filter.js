const MarkdownIt = require('markdown-it');

module.exports = function markdown(value) {
  return MarkdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).render(value);
};
