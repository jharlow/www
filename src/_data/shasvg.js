const crypto = require('crypto');

// getSHA256Hash :: string -> string (string len 64)
function getSHA256Hash(input) {
  return crypto
    .createHash('sha256')
    .update(input)
    .digest('hex');
}

/**
 * @param {string} char - must be one letter long
 */
const getPercentFromChar = char => {
  if (char.length !== 1) throw new Error('Input must be a single character');
  char = char.toLowerCase();
  if (char >= 'a' && char <= 'z') {
    const position = char.charCodeAt(0) - 'a'.charCodeAt(0);
    return Math.round((position / 25) * 100);
  }
  if (char >= '0' && char <= '9') return Math.round((parseInt(char, 10) / 9) * 100);
  throw new Error('Input must be a letter from a to z or a digit from 0 to 9');
};

/**
 * @param {number} value
 */
const mapToUpperHalf = value => 50 + (value / 100) * 50;

/**
 * @param {number} value
 */
const mapToLowerHalf = value => (value / 100) * 50;

const charToRGB = (char1, char2, char3, char4) => {
  const charToValue = char => Math.floor((char.charCodeAt(0) / 127) * 255);

  // Get RGB values from the characters
  const r = (charToValue(char1) + charToValue(char2)) % 256;
  const g = (charToValue(char2) + charToValue(char3)) % 256;
  const b = (charToValue(char3) + charToValue(char4)) % 256;

  return [r, g, b].map(mapToLowerHalf);
};

/**
 * @param {string} hash
 */
const breakHashIntoCunks = hash => {
  const alphas = hash
    .slice(0, -4)
    .split('')
    .map(getPercentFromChar);
  const tint = charToRGB(...hash.slice(-4, hash.length).split(''));
  return { alphas, tint };
};

const SQUARE_SIZE = 100;

const box = (x, y, r, g, b, a) =>
  `<rect x="${x * SQUARE_SIZE}" y="${y *
  SQUARE_SIZE}" width="${SQUARE_SIZE}" height="${SQUARE_SIZE}" fill="rgba(${r}, ${g}, ${b}, ${a})"></rect>`;

const MAX_X_SQUARES = 10;
const MAX_Y_SQUARES = 6;

// can display 60 squares (hence 6-1 and 600-100), but feel it looks better 5 deep for now
module.exports = function(string = 'this is a long lazy dog') {
  const xSquares = MAX_X_SQUARES;
  const ySquares = MAX_Y_SQUARES - 1;
  const hash = getSHA256Hash(string);
  const { alphas, tint } = breakHashIntoCunks(hash);
  const boxes = Array.from({ length: ySquares })
    .flatMap((_, y) =>
      Array.from({ length: xSquares }).map((_, x) => {
        return { x, y };
      })
    )
    .map(({ x, y }, i) => box(x, y, ...tint, mapToUpperHalf(alphas[i]) / 100));
  return `
<svg id="sha-svg-${1}" viewBox="0 0 ${xSquares * SQUARE_SIZE} ${ySquares * SQUARE_SIZE}">
${boxes.reduce((acc, box) => acc.concat(box), '')}
</svg>
`;
};
