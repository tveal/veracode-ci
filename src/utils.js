export default {
  parseStringToArray: (str) => str
    .replace(/\\,/g, '%2C')
    .split(',')
    .map((ex) => decodeURIComponent(ex)),
};
