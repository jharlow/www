const accomplishmentsFormatted = require('./accomplishmentsFormatted');

module.exports = async function() {
  return (await accomplishmentsFormatted()).slice(0, 4);
};
