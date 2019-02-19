const extractCoordinates = (line, index) => {
  return [parseInt(line[index + 1], 10), parseInt(line[index], 10)];
};

const getType = line => {
  const str = line[0].toString().replace(/ /g, "");
  return str.split("")[0];
};

module.exports = {
  extractCoordinates,
  getType
};
