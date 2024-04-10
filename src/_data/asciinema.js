module.exports = function(id, title) {
  return `
<script id="asciicast-${id}" src="https://asciinema.org/a/${id}.js" async data-autoplay="1" data-loop="1"></script>
<noscript><img src="https://asciinema.org/a/${id}.svg" alt="${title}"></noscript>
`;
};
