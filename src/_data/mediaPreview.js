
module.exports = function(title, author, coverUrl, type) {
  let authorTemplate = ''
  if (author && author !== 'undefined') {
    authorTemplate = `<div class="media-preview__author">${author}</div>` ;
  }
  return `
<div class="media-preview">
  <img
    class="media-preview__cover ${type === 'album' ? 'media-preview__cover--album' : ''}"
    alt="The media cover for ${title}"
    src="${coverUrl}"
  />
  <div class="media-preview__about">
    <div class="media-preview__title">${title}</div>
    ${authorTemplate}
  </div>
</div>
`;
};
