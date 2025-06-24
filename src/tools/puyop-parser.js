#!/usr/bin/env deno run --allow-net

const PUYO_COLORS = {
    0: '.',  // Empty
    1: 'R',  // Red
    2: 'G',  // Green
    3: 'B',  // Blue
    4: 'Y',  // Yellow
    5: 'P',  // Purple
    6: 'O'   // Ojama
};

const FIELD_WIDTH = 6;
const FIELD_HEIGHT = 13;

const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function base62ToDecimal(char) {
    const index = BASE62_CHARS.indexOf(char);
    if (index === -1) {
        throw new Error(`Invalid base62 character: ${char}`);
    }
    return index;
}

function decodeFieldString(encodedString) {
    const field = Array(FIELD_HEIGHT).fill().map(() => Array(FIELD_WIDTH).fill(0));
    
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

function createField(encodedData) {
    return decodeFieldString(encodedData);
}

function fieldToString(field) {
    return field.map(row => 
        row.map(cell => PUYO_COLORS[cell] || '.').join('')
    ).join('\n');
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
        console.error('Usage: deno run --allow-net puyop_parser.js <puyop_url>');
        console.error('Example: deno run --allow-net puyop_parser.js "https://www.puyop.com/s/1"');
        Deno.exit(1);
    }
    
    const url = args[0];
    try {
        const result = parsePuyopUrl(url);
        console.log(result);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        Deno.exit(1);
    }
}

// Export for use as module
export { parsePuyopUrl };