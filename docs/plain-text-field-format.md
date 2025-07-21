# Plain Text Field Format Specification

## Overview

This document defines the specification for representing Puyo Puyo game fields in plain text format. This format is designed to be human-readable, easily parseable, and compatible with bidirectional conversion to/from puyop.com URLs.

## Field Dimensions

- **Width**: 6 columns (standard Puyo Puyo field width)
- **Height**: 13 rows (standard Puyo Puyo field height including invisible top row)
- **Coordinate System**: Row 0 is at the top, Column 0 is at the left
- **Field Layout**: `field[row][column]` where `row` ranges from 0-12 and `column` ranges from 0-5

## Character Symbols

| Symbol | Meaning | Description |
|--------|---------|-------------|
| `.` | Empty | Empty cell (no puyo) |
| `R` | Red | Red puyo |
| `G` | Green | Green puyo |
| `B` | Blue | Blue puyo |
| `Y` | Yellow | Yellow puyo |
| `P` | Purple | Purple puyo |
| `O` | Ojama | Ojama (garbage) puyo |
| `T` | Iron | Iron puyo (falls but cannot be cleared) |
| `#` | Comment | Comment line (entire line is ignored) |

## Format Rules

### Basic Structure

```
# Comment line (optional)
......  # Row 0 (top, usually invisible)
......  # Row 1
......  # Row 2
......  # Row 3
......  # Row 4
......  # Row 5
......  # Row 6
......  # Row 7
......  # Row 8
......  # Row 9
......  # Row 10
......  # Row 11
RRGGBB  # Row 12 (bottom)
```

### Trailing Space Omission

- Trailing empty cells (`.`) at the end of each row MAY be omitted
- If omitted, missing positions are treated as empty (`.`)
- Example: `RRG` is equivalent to `RRG...`

### Leading Row Omission

- Empty rows at the top of the field MAY be omitted
- Missing rows are treated as completely empty
- Example: A field with only bottom 3 rows populated can be written as:
  ```
  RG....
  RRGGBB
  YYPPOO
  ```
  Instead of the full 13-row representation

### Comment Lines

- Lines starting with `#` are treated as comments and ignored during parsing
- Comments can be placed anywhere in the field representation
- Inline comments (after field data) are NOT supported

### Whitespace Handling

- Leading and trailing whitespace on each line is ignored
- Empty lines are ignored
- Spaces within the field data are NOT allowed (except for trailing spaces which are treated as empty cells)

## Examples

### Example 1: GTR Setup
```
# GTR (Green-T-Red) setup example
BO.TP.
BGRYBP
BBGRYY
GGRRYP
```

### Example 2: Full Field Representation
```
# Complete 13-row field with mixed content
......
......
......
......
......
......
......
......
......
R.G.B.
RRGGBB
YYPPOO
TTTTTT
```

### Example 3: Minimal Representation
```
# Same field with omitted empty rows and trailing spaces
R.G.B
RRGGBB
YYPPOO
TTTTTT
```

### Example 4: Single Puyo
```
# Single red puyo at bottom-right
.....R
```

### Example 5: With Comments
```
# This is a chain setup
# Red and Blue form a vertical pair
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
.....R  # Red puyo
.....B  # Blue puyo below
RRGGBB  # Bottom row foundation
```

## Parsing Algorithm

### From Plain Text to Internal Representation

1. Remove all comment lines (lines starting with `#`)
2. Remove leading and trailing whitespace from each line
3. Remove empty lines
4. Create a 13x6 field initialized with empty cells (`.`)
5. For each remaining line:
   - Pad with empty cells (`.`) to reach width of 6 if shorter
   - Truncate to width of 6 if longer
   - Map each character to the corresponding cell value
6. If fewer than 13 rows are provided, assume missing top rows are empty

### From Internal Representation to Plain Text

1. Convert internal field representation to character symbols
2. Optionally omit trailing empty cells in each row
3. Optionally omit leading empty rows
4. Add comments as needed for clarity

## Validation Rules

### Required Validations

- Field width must not exceed 6 columns per row
- Only valid symbols (`R`, `G`, `B`, `Y`, `P`, `O`, `T`, `.`) are allowed
- Comment lines must start with `#`

### Recommended Validations

- Warn if field height exceeds 13 rows
- Warn if invalid characters are encountered
- Validate that the field represents a physically possible game state

## Bidirectional Conversion Compatibility

This format is designed to be fully compatible with puyop.com URL encoding:

- **To puyop.com**: Plain text → Internal representation → Base62 encoding → URL
- **From puyop.com**: URL → Base62 decoding → Internal representation → Plain text

The conversion maintains field state exactly, ensuring no data loss in either direction.

## File Extension

When saving plain text field files, the recommended extension is `.puyo` or `.txt`.

Example filename: `gtr-setup.puyo`