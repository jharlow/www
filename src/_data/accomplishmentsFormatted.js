const fs = require('fs/promises');

module.exports = async function() {
  try {
    const data = await fs.readFile('src/_data/accomplishments.json', 'utf8');
    return JSON.parse(data).items.reduce((acc, accomplishment, index, arr) => {
      if (index === 0) return [accomplishment];
      const prevAccomplishment = arr[index - 1];
      const sameTeam = accomplishment.team === prevAccomplishment.team;
      const sameOrg = accomplishment.organization === prevAccomplishment.organization;
      if (sameTeam && sameOrg) {
        return [...acc, { ...accomplishment, isDuplicate: true }];
      }
      return [...acc, accomplishment];
    }, []);
  } catch (err) {
    console.error('Error reading or parsing the file:', err);
  }
};
