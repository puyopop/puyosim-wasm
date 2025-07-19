#!/usr/bin/env deno run --allow-net

const PUYO_COLORS = {
  0: '.', // Empty
  1: 'R', // Red
  2: 'G', // Green
  3: 'B', // Blue
  4: 'Y', // Yellow
  5: 'P', // Purple
  6: 'O', // Ojama
  7: 'K', // Kata
  8: 'T', // Iron/Tetsugami
};

const COLOR_TO_NUMBER = {
  '.': 0, // Empty
  'R': 1, // Red
  'G': 2, // Green
  'B': 3, // Blue
  'Y': 4, // Yellow
  'P': 5, // Purple
  'O': 6, // Ojama
  'K': 7, // Kata
  'T': 8, // Iron/Tetsugami
};

const FIELD_WIDTH = 6;
const FIELD_HEIGHT = 13;

const BASE62_CHARS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function base62ToDecimal(char) {
  const index = BASE62_CHARS.indexOf(char);
  if (index === -1) {
    throw new Error(`Invalid base62 character: ${char}`);
  }
  return index;
}

function decimalToBase62(num) {
  if (num < 0 || num >= 62) {
    throw new Error(`Number out of base62 range: ${num}`);
  }
  return BASE62_CHARS[num];
}

function decodeFieldString(encodedString) {
  if (encodedString.length === 0) {
    return Array(FIELD_HEIGHT).fill().map(() => Array(FIELD_WIDTH).fill(0));
  }
  if (encodedString[0] === '=') {
    return decodeFieldString2(encodedString);
  }
  return decodeFieldString1(encodedString);
}

function decodeFieldString1(encodedString) {
  const field = Array(FIELD_HEIGHT).fill().map(() =>
    Array(FIELD_WIDTH).fill(0)
  );

  let currentRow = 12;
  let currentCol = 5;

  // Process string from end to beginning
  for (let i = encodedString.length - 1; i >= 0; i--) {
    const char = encodedString[i];
    const decimal = base62ToDecimal(char);

    const rightBits = decimal & 0b111;
    const leftBits = (decimal >> 3) & 0b111;

    if (rightBits > 0) {
      field[currentRow][currentCol] = rightBits;
    }

    const leftCol = currentCol - 1;
    if (leftCol >= 0 && leftBits > 0) {
      field[currentRow][leftCol] = leftBits;
    }

    currentCol -= 2;
    if (currentCol < 0) {
      currentRow--;
      currentCol = 5;
    }

    if (currentRow < 0) break;
  }

  return field;
}

function decodeFieldString2(encodedString) {
  // assert(encodedString[0] === '=');
  const stack = [...encodedString];
  const field = Array(FIELD_HEIGHT).fill().map(() =>
    Array(FIELD_WIDTH).fill(0)
  );
  for (let i = FIELD_HEIGHT - 1; i >= 0; i--) {
    for (let j = FIELD_WIDTH - 1; j >= 0; j--) {
      if (stack.length === 1) { // "=" の分
        return field;
      }
      const char = stack.pop();
      const n = parseInt(char);
      field[i][j] = n;
    }
  }
  return field;
}

function createField(encodedData) {
  return decodeFieldString(encodedData);
}

function fieldToString(field) {
  return field.map((row) =>
    row.map((cell) => PUYO_COLORS[cell] || '.').join('')
  ).join('\n');
}

function parseFieldText(plainText) {
  const lines = plainText.split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));

  const field = Array(FIELD_HEIGHT).fill().map(() =>
    Array(FIELD_WIDTH).fill(0)
  );

  const startRow = Math.max(0, FIELD_HEIGHT - lines.length);

  lines.forEach((line, index) => {
    const row = startRow + index;
    if (row >= FIELD_HEIGHT) return;

    for (let col = 0; col < Math.min(line.length, FIELD_WIDTH); col++) {
      const char = line[col].toUpperCase();
      if (Object.prototype.hasOwnProperty.call(COLOR_TO_NUMBER, char)) {
        field[row][col] = COLOR_TO_NUMBER[char];
      } else {
        throw new Error(
          `Invalid character '${char}' at row ${row + 1}, column ${col + 1}`,
        );
      }
    }
  });

  return field;
}

function encodeFieldToString(field) {
  const reversed = [];
  for (let i = field.length - 1; i >= 0; i--) {
    for (let j = field[i].length - 1; j >= 0; j--) {
      reversed.push(
        field[i][j],
      );
    }
  }
  return '=' + reversed.reverse().join('');
}

function plainTextToPuyopUrl(plainText) {
  try {
    const field = parseFieldText(plainText);
    const encodedString = encodeFieldToString(field);
    return `https://www.puyop.com/s/${encodedString}`;
  } catch (error) {
    throw new Error(`Failed to convert plain text to URL: ${error.message}`);
  }
}

function parsePuyopUrl(url) {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;

    // Extract the encoded field data from /s/xxx format
    const match = path.match(/^\/s\/(.+)$/);
    if (!match) {
      throw new Error('Invalid puyop.com URL format');
    }

    const encodedData = match[1];
    const field = createField(encodedData);
    return fieldToString(field);
  } catch (error) {
    throw new Error(`Failed to parse URL: ${error.message}`);
  }
}

// Main execution
if (import.meta.main) {
  const args = Deno.args;
  if (args.length === 0) {
    console.error('Usage:');
    console.error(
      '  URL to Plain Text: deno run --allow-net puyop_parser.js <puyop_url>',
    );
    console.error(
      '  Plain Text to URL: deno run --allow-net puyop_parser.js --to-url <plain_text>',
    );
    console.error('Examples:');
    console.error(
      '  deno run --allow-net puyop_parser.js "https://www.puyop.com/s/1"',
    );
    console.error('  deno run --allow-net puyop_parser.js --to-url "RG\\nRB"');
    Deno.exit(1);
  }

  try {
    if (args[0] === '--to-url' && args.length > 1) {
      const plainText = args.slice(1).join(' ').replace(/\\n/g, '\n');
      const result = plainTextToPuyopUrl(plainText);
      console.log(result);
    } else {
      const url = args[0];
      const result = parsePuyopUrl(url);
      console.log(result);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    Deno.exit(1);
  }
}

// Export for use as module
export { fieldToString, parseFieldText, parsePuyopUrl, plainTextToPuyopUrl };
