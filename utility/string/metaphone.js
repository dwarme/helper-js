/**
 * @file metaphone.js
 * @description
 * This file implements the Metaphone algorithm, a phonetic algorithm developed by Lawrence Philips in 1990.
 * The Metaphone algorithm is used to encode words into phonetic representations, allowing for similar-sounding
 * words to be matched despite differences in spelling. This algorithm is useful for applications such as
 * search engines, spell checkers, and data deduplication, where similar-sounding words should be treated as equivalent.
 *
 * The algorithm works by transforming a string of text into a phonetic code based on a set of rules that determine
 * how individual letters or groups of letters are pronounced in English. The resulting code is a simplified representation
 * of the word's pronunciation, which can then be compared to other words for similarity.
 *
 * Key Features:
 * - Converts words into phonetic codes based on pronunciation.
 * - Handles special cases for silent letters and letter combinations.
 * - Ignores non-alphabetical characters.
 * - Useful for matching similar-sounding words.
 *
 * @version 1.0.0
 * @author Daouda Warme
 * @license MIT
 *
 * */

// Special encodings
const SH = 'X';
const TH = '0';

// Character encoding array & accessing macros
// This is similar to the `_codes` array in the original PHP code
const codes = [
    1, 16, 4, 16, 9, 2, 4, 16, 9, 2, 0, 2, 2, 2, 1, 4, 0, 2, 4, 4, 1, 0, 0, 0, 8, 0
    //  a  b  c  d  e  f  g  h  i  j  k  l  m  n  o  p  q  r  s  t  u  v  w  x  y  z
];

// Helper function to encode characters (equivalent to `encode` in PHP)
const encode = (c) => {
    const charCode = c.charCodeAt(0) - 65; // Convert letter to an index from A-Z
    return charCode >= 0 && charCode < 26 ? codes[charCode] : 0;
};

// Macros as functions
const isVowel = (c) => encode(c) & 1;       // AEIOU
const noChange = (c) => encode(c) & 2;      // FJMNRL
const affectH = (c) => encode(c) & 4;       // CGPST
const makeSoft = (c) => encode(c) & 8;      // EIY
const noGhToF = (c) => encode(c) & 16;      // BDH

// Converts the raw character to uppercase
//const convertRaw = (c) => c.toUpperCase();
const convertRaw = (c) => {
    // Ensure `c` is a valid string before converting to uppercase
    if (typeof c === 'string') {
        return c.toUpperCase();
    }
    return ''; // Return an empty string or handle it accordingly if `c` is not valid
};


// Safe lookahead function
const lookAhead = (word, w_idx, how_far) => {
    const idx = w_idx + how_far;
    return idx < word.length ? convertRaw(word[idx]) : '\0';
};

// JavaScript equivalent of the Metaphone function
export default function metaphone(word, maxPhonemes = 0) {
    let result = ''; // Phoned word
    let w_idx = 0; // Current index in the word
    const wordLen = word.length;
    word = word.toUpperCase(); // Normalize input to uppercase

    // Allocate space for result based on word length or max phonemes
    const maxBufferLen = maxPhonemes > 0 ? maxPhonemes : wordLen;

    // Function to append phonized characters to result
    const phonize = (c) => {
        if (result.length < maxBufferLen) {
            result += c;
        }
    };

    // Process the first letter specially
    while (!/[A-Z]/.test(word[w_idx]) && w_idx < wordLen) {
        w_idx++;
    }
    if (w_idx >= wordLen) return result; // If word has no alphabet characters

    let currLetter = convertRaw(word[w_idx]);

    // Handle special cases for the first letter
    switch (currLetter) {
        case 'A':
            if (convertRaw(word[w_idx + 1]) === 'E') {
                phonize('E');
                w_idx += 2;
            } else {
                phonize('A');
                w_idx++;
            }
            break;
        case 'G':
        case 'K':
        case 'P':
            if (convertRaw(word[w_idx + 1]) === 'N') {
                phonize('N');
                w_idx += 2;
            }
            break;
        case 'W': {
            const nextLetter = convertRaw(word[w_idx + 1]);
            if (nextLetter === 'R') {
                phonize('R');
                w_idx += 2;
            } else if (nextLetter === 'H' || isVowel(nextLetter)) {
                phonize('W');
                w_idx += 2;
            }
            break;
        }
        case 'X':
            phonize('S');
            w_idx++;
            break;
        case 'E':
        case 'I':
        case 'O':
        case 'U':
            phonize(currLetter);
            w_idx++;
            break;
        default:
            break;
    }

    // Process the rest of the word
    while (w_idx < wordLen && (maxPhonemes === 0 || result.length < maxPhonemes)) {
        currLetter = convertRaw(word[w_idx]);

        // Skip non-alphabetic characters
        if (!/[A-Z]/.test(currLetter)) {
            w_idx++;
            continue;
        }

        const prevLetter = w_idx > 0 ? convertRaw(word[w_idx - 1]) : '\0';
        const nextLetter = convertRaw(word[w_idx + 1]);
        const afterNextLetter = lookAhead(word, w_idx, 2);

        // Process the current letter
        switch (currLetter) {
            case 'B':
                if (prevLetter !== 'M') phonize('B');
                break;
            case 'C':
                if (makeSoft(nextLetter)) {
                    if (nextLetter === 'I' && afterNextLetter === 'A') phonize(SH);
                    else if (prevLetter !== 'S') phonize('S');
                } else if (nextLetter === 'H') {
                    if (!noGhToF(prevLetter) || afterNextLetter === 'R') phonize('K');
                    else phonize(SH);
                    w_idx++; // Skip one letter ahead
                } else {
                    phonize('K');
                }
                break;
            case 'D':
                if (nextLetter === 'G' && makeSoft(afterNextLetter)) {
                    phonize('J');
                    w_idx++;
                } else phonize('T');
                break;
            case 'G':
                if (nextLetter === 'H' && !noGhToF(lookAhead(word, w_idx, -3))) {
                    phonize('F');
                    w_idx++;
                } else if (nextLetter !== 'N' && makeSoft(nextLetter)) {
                    phonize('J');
                } else phonize('K');
                break;
            case 'H':
                if (isVowel(nextLetter) && !affectH(prevLetter)) phonize('H');
                break;
            case 'K':
                if (prevLetter !== 'C') phonize('K');
                break;
            case 'P':
                if (nextLetter === 'H') phonize('F');
                else phonize('P');
                break;
            case 'S':
                if (nextLetter === 'H' || (nextLetter === 'I' && (afterNextLetter === 'A' || afterNextLetter === 'O'))) {
                    phonize(SH);
                    w_idx++;
                } else phonize('S');
                break;
            case 'T':
                if (nextLetter === 'H') {
                    phonize(TH);
                    w_idx++;
                } else if (nextLetter === 'I' && (afterNextLetter === 'A' || afterNextLetter === 'O')) {
                    phonize(SH);
                } else phonize('T');
                break;
            case 'W':
                if (isVowel(nextLetter)) phonize('W');
                break;
            case 'X':
                phonize('K');
                phonize('S');
                break;
            case 'Y':
                if (isVowel(nextLetter)) phonize('Y');
                break;
            case 'Z':
                phonize('S');
                break;
            default:
                if (noChange(currLetter)) phonize(currLetter);
                break;
        }
        w_idx++;
    }

    return result;
}