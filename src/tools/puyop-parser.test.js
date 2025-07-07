#!/usr/bin/env deno run --allow-net

import { parsePuyopUrl, plainTextToPuyopUrl } from './puyop-parser.js';

// Check for verbose flag
const args = Deno.args;
const verbose = args.includes('--verbose') || args.includes('-v');

// Test cases
const testCases = [
  {
    name: 'Empty field (minimal code)',
    url: 'https://www.puyop.com/s/000',
    expected: `......
......
......
......
......
......
......
......
......
......
......
......
......`.trim(),
  },
  {
    name: 'Path-based field code',
    url: 'https://www.puyop.com/s/pg0ra09i0',
    expected: `......
......
......
......
......
......
......
......
......
......
BRG...
BBRG..
RRGG..`.trim(),
  },
  {
    name: 'Another example field',
    url: 'https://www.puyop.com/s/123abc',
    expected: `......
......
......
......
......
......
......
......
......
......
......
.R.G.B
RGRBRY`.trim(),
  },
  {
    name: 'Complex field with multiple puyos',
    url: 'https://www.puyop.com/s/3pkrraA9iz',
    expected: `......
......
......
......
......
......
......
......
......
.....B
BRGYBB
BBRGYY
RRGGYB`.trim(),
  },
  {
    name: 'Very complex field with long code',
    url: 'https://www.puyop.com/s/804rcxpcpAxbpkrraA9iz',
    expected: `......
......
......
......
......
......
R....Y
BBRYYR
BRRYBR
YYYRRB
BRGYBB
BBRGYY
RRGGYB`.trim(),
  },
  // New test cases based on specifications
  {
    name: 'Single puyo - R at bottom right',
    url: 'https://www.puyop.com/s/1',
    expected: `......
......
......
......
......
......
......
......
......
......
......
......
.....R`.trim(),
  },
  {
    name: 'Horizontal pair - RR',
    url: 'https://www.puyop.com/s/9',
    expected: `......
......
......
......
......
......
......
......
......
......
......
......
....RR`.trim(),
  },
  {
    name: 'Horizontal pair - RB',
    url: 'https://www.puyop.com/s/b',
    expected: `......
......
......
......
......
......
......
......
......
......
......
......
....RB`.trim(),
  },
  {
    name: 'Horizontal triple - RRY',
    url: 'https://www.puyop.com/s/1c',
    expected: `......
......
......
......
......
......
......
......
......
......
......
......
...RRY`.trim(),
  },
  {
    name: 'Vertical pair - RR',
    url: 'https://www.puyop.com/s/1001',
    expected: `......
......
......
......
......
......
......
......
......
......
......
.....R
.....R`.trim(),
  },
];

// Test the parser with sample URLs
if (verbose) {
  console.log('Testing PuyoP URL Parser\n');
}

let passedTests = 0;
const totalTests = testCases.length;
const failedTests = [];

testCases.forEach((testCase, index) => {
  if (verbose) {
    console.log(`Test ${index + 1}: ${testCase.name}`);
    console.log(`URL: ${testCase.url}`);
  }

  const result = parsePuyopUrl(testCase.url);

  if (result) {
    if (verbose) {
      console.log('Parsed field:');
      console.log(result);
    }

    // Compare with expected result
    const normalizeText = (text) => text.replace(/\s+/g, ' ').trim();
    const actualNormalized = normalizeText(result);
    const expectedNormalized = normalizeText(testCase.expected);

    if (actualNormalized === expectedNormalized) {
      if (verbose) {
        console.log('✅ PASS - Result matches expected');
      }
      passedTests++;
    } else {
      const failedTest = {
        index: index + 1,
        name: testCase.name,
        url: testCase.url,
        expected: testCase.expected,
        actual: result,
      };
      failedTests.push(failedTest);

      if (verbose) {
        console.log('❌ FAIL - Result does not match expected');
        console.log('Expected:');
        console.log(testCase.expected);
        console.log('Actual:');
        console.log(result);
      }
    }
  } else {
    const failedTest = {
      index: index + 1,
      name: testCase.name,
      url: testCase.url,
      expected: testCase.expected,
      actual: null,
      error: 'Could not parse URL',
    };
    failedTests.push(failedTest);

    if (verbose) {
      console.log('Failed to parse or empty field');
      console.log('❌ FAIL - Could not parse URL');
    }
  }

  if (verbose) {
    console.log('-'.repeat(50));
  }
});

// Always show summary
console.log(`Test Summary: ${passedTests}/${totalTests} tests passed`);

// Show failed tests details if any failures occurred
if (failedTests.length > 0) {
  console.log(`\n❌ ${failedTests.length} test(s) failed:`);
  failedTests.forEach((test) => {
    console.log(`\nTest ${test.index}: ${test.name}`);
    console.log(`URL: ${test.url}`);
    if (test.error) {
      console.log(`Error: ${test.error}`);
    } else {
      console.log('Expected:');
      console.log(test.expected);
      console.log('Actual:');
      console.log(test.actual);
    }
    console.log('-'.repeat(30));
  });
}

// Bidirectional conversion tests
if (verbose) {
  console.log('\n=== Bidirectional Conversion Tests ===');
}

const bidirectionalTests = [
  {
    name: 'Single red puyo',
    plainText: '.....R',
    expectedUrl: 'https://www.puyop.com/s/1',
  },
  {
    name: 'Horizontal pair RR',
    plainText: '....RR',
    expectedUrl: 'https://www.puyop.com/s/9',
  },
  {
    name: 'GTR setup',
    plainText: `BO.TP.
BGRYBP
BBGRYY
GGRRYP`,
    expectedUrl: null, // We'll generate and verify round-trip
  },
  {
    name: 'Complex field with comments',
    plainText: `# This is a test field
R.G.B.
RRGGBB
# Bottom row
YYPPOO`,
    expectedUrl: null,
  },
];

let bidirectionalPassed = 0;
const bidirectionalFailed = [];

bidirectionalTests.forEach((test, index) => {
  if (verbose) {
    console.log(`\nBidirectional Test ${index + 1}: ${test.name}`);
    console.log('Plain text input:');
    console.log(test.plainText);
  }

  try {
    // Test plain text to URL conversion
    const generatedUrl = plainTextToPuyopUrl(test.plainText);
    if (verbose) {
      console.log(`Generated URL: ${generatedUrl}`);
    }

    // Test URL back to plain text conversion
    const roundTripPlainText = parsePuyopUrl(generatedUrl);
    if (verbose) {
      console.log('Round-trip plain text:');
      console.log(roundTripPlainText);
    }

    // Normalize both texts for comparison (remove comments, empty lines, and leading empty rows)
    const normalizeText = (text) => {
      const lines = text.split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith('#'));

      // Remove leading empty rows (lines with only dots)
      while (lines.length > 0 && lines[0].match(/^\.+$/)) {
        lines.shift();
      }

      return lines.join('\n');
    };

    const originalNormalized = normalizeText(test.plainText);
    const roundTripNormalized = normalizeText(roundTripPlainText);

    // Check if specific URL is expected
    if (test.expectedUrl) {
      if (generatedUrl === test.expectedUrl) {
        if (verbose) {
          console.log('✅ URL generation matches expected');
        }
      } else {
        if (verbose) {
          console.log(
            `❌ URL mismatch. Expected: ${test.expectedUrl}, Got: ${generatedUrl}`,
          );
        }
        bidirectionalFailed.push({
          test: test.name,
          error:
            `URL mismatch. Expected: ${test.expectedUrl}, Got: ${generatedUrl}`,
        });
        return;
      }
    }

    // Check round-trip conversion
    if (originalNormalized === roundTripNormalized) {
      if (verbose) {
        console.log('✅ Round-trip conversion successful');
      }
      bidirectionalPassed++;
    } else {
      if (verbose) {
        console.log('❌ Round-trip conversion failed');
        console.log('Original normalized:');
        console.log(originalNormalized);
        console.log('Round-trip normalized:');
        console.log(roundTripNormalized);
      }
      bidirectionalFailed.push({
        test: test.name,
        error: 'Round-trip conversion failed',
        original: originalNormalized,
        roundTrip: roundTripNormalized,
      });
    }
  } catch (error) {
    if (verbose) {
      console.log(`❌ Error: ${error.message}`);
    }
    bidirectionalFailed.push({
      test: test.name,
      error: error.message,
    });
  }
});

console.log(
  `\nBidirectional Test Summary: ${bidirectionalPassed}/${bidirectionalTests.length} tests passed`,
);

if (bidirectionalFailed.length > 0) {
  console.log(
    `\n❌ ${bidirectionalFailed.length} bidirectional test(s) failed:`,
  );
  bidirectionalFailed.forEach((failure) => {
    console.log(`\n${failure.test}: ${failure.error}`);
    if (failure.original && failure.roundTrip) {
      console.log(`Original: ${failure.original}`);
      console.log(`Round-trip: ${failure.roundTrip}`);
    }
  });
}

// Exit with non-zero code if any tests failed
if (failedTests.length > 0 || bidirectionalFailed.length > 0) {
  Deno.exit(1);
}
