// utils.js

function isValidHex24(str) {
  const hexRegex = /[0-9a-fA-F]{24}/;
  return hexRegex.test(str);
}

module.exports = {
  isValidHex24,
};
