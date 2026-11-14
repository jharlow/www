const projectsFormatted = require("./projectsFormatted");

module.exports = async function () {
  return (await projectsFormatted()).slice(0, 4);
};
