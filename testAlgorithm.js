const possibleDigits = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '!',
  '@',
  '$',
  '%',
  '¨',
  '&',
  '*',
  '(',
  ')',
  '-',
  '_',
  '+',
  '=',
  '§',
  '¹',
  '²',
  '³',
  '£',
  '¢',
  '{',
  '[',
  'ª',
  '´',
  '`',
  '^',
  '~',
  ']',
  '}',
  'º',
  ',',
  '.',
  '<',
  '>',
  '|',
  ';',
  ':',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'X',
  'W',
  'Y',
  'Z',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'x',
  'w',
  'y',
  'z',
];

/**
 * Algorithm adaptaded from https://members.loria.fr/PZimmermann/mca/mca-cup-0.5.9.pdf page 39
 *
 * @param {number} id integer to convert
 * @param {number} base new base
 * @param {Object} finalString workaround javascript not allowing simple variables pass by reference
 * @return {string} converted value
 */
function fastIntegerOutput(id, base, finalString) {
  if (id <= base) return possibleDigits[id - 1];
  else {
    const quotient = Math.floor(id / base);
    const rest = id % base;
    finalString.result += fastIntegerOutput(
      rest === 0 ? quotient + -1 : quotient,
      base,
      finalString,
    );
    finalString.result += fastIntegerOutput(
      rest === 0 ? base : rest,
      base,
      finalString,
    );
    return finalString.result;
  }
}

for (let index = 9000; index < 10000; index++) {
  console.log(
    index,
    fastIntegerOutput(index, possibleDigits.length, {
      result: '',
    }),
  );
}
