const fs = require('fs/promises');

module.exports = async function() {
  let accomplishments = { items: [] };
  try {
    const data = await fs.readFile('src/_data/accomplishments.json', 'utf8');
    const jsonData = JSON.parse(data);
    accomplishments = jsonData;
  } catch (err) {
    console.error('Error reading or parsing the file:', err);
  }
  return accomplishments.items
    .reverse()
    .reduce((acc, accomplishment, index, arr) => {
      if (index === arr.length - 1) return [...acc, accomplishment];
      const nextAccomplishment = arr[index + 1];
      const sameTeam = accomplishment.team === nextAccomplishment.team;
      const sameOrg = accomplishment.organization === nextAccomplishment.organization;
      if (sameTeam && sameOrg)
        return [
          ...acc,
          {
            ...accomplishment,
            team: '',
            organization: ''
          }
        ];
      return [...acc, accomplishment];
    }, [])
    .reverse();
};
