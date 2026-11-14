const fs = require("fs/promises");

module.exports = async function () {
  try {
    const data = await fs.readFile("src/_data/projects.json", "utf8");
    return JSON.parse(data).items.reduce((acc, project, index, arr) => {
      if (index === 0) return [project];
      const prevproject = arr[index - 1];
      const sameTeam = project.team === prevproject.team;
      const sameOrg = project.organization === prevproject.organization;
      if (sameTeam && sameOrg) {
        return [...acc, { ...project, isDuplicate: true }];
      }
      return [...acc, project];
    }, []);
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
  }
};
