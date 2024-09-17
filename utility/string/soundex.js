/**
 * @file soundex.js
 * @description
 * This file implements the Soundex algorithm, a phonetic algorithm for indexing words by their sound when pronounced in English.
 * Soundex is primarily used to find similar-sounding words despite minor differences in spelling. It converts words into
 * a code based on their pronunciation, which can then be used to compare words that may have different spellings but sound alike.
 *
 * The algorithm follows a simple set of rules:
 * - The first letter of the word is retained.
 * - All occurrences of certain letters (B, F, P, V, etc.) are converted to the same digit.
 * - Similar sounding letters are grouped under a common number.
 * - Consecutive duplicates are reduced to a single instance.
 * - The result is padded or truncated to a four-character code.
 *
 * Soundex is widely used in genealogical research, record linkage, and other applications where similar-sounding names
 * should be considered equivalent.
 *
 * Key Features:
 * - Encodes words based on their phonetic pronunciation.
 * - Handles different letter groups (B, F, P, V) and reduces consecutive duplicates.
 * - Returns a 4-character alphanumeric code.
 * - Suitable for matching names or words with similar sounds.
 *
 *  @module soundex
 *  @version 1.0.0
 *  @author Your Name
 *  @license MIT
 *
 * */


/**
 *
 * @param str {string}
 * @returns {string}
 */
export default function soundex(str) {
    // Define the Soundex table, mapping letters to their Soundex codes
    const soundexTable = {
        A: 0, B: '1', C: '2', D: '3', E: 0, F: '1', G: '2', H: 0, I: 0,
        J: '2', K: '2', L: '4', M: '5', N: '5', O: 0, P: '1', Q: '2',
        R: '6', S: '2', T: '3', U: 0, V: '1', W: 0, X: '2', Y: 0, Z: '2'
    };

    // Convert string to uppercase and remove non-letter characters
    // BUG: should also map here accented letters used in non-English words or names
    // e.g., eszett (ß), thorn (Þ), ñ, ç, š, etc.
    str = str.toUpperCase().replace(/[^A-Z]/g, '');

    // If the string is empty after cleanup, return an empty result
    if (str.length === 0) {
        return ''; // Return empty string if input has no valid characters
    }

    // Initialize Soundex code with the first letter
    let soundexCode = str[0]; // First letter remains unchanged
    let lastCode = soundexTable[soundexCode] || 0; // Get the Soundex code for the first character

    // Loop through the rest of the string, building the Soundex code
    for (let i = 1, _small = 1; i < str.length && soundexCode.length < 4; i++) {
        const char = str[i];
        let code = soundexTable[char]; // Get the Soundex code for the current character

        // Ignore sequences of consonants with the same Soundex code and vowels
        // unless they separate consonant letters
        if (code && code !== lastCode) {
            soundexCode += code; // Add the Soundex code to the result
            lastCode = code; // Update lastCode to check the next consonant sequence
        }
    }

    // Pad the Soundex code with zeros to ensure it's 4 characters long
    while (soundexCode.length < 4) {
        soundexCode += '0'; // Add '0' until the code is of length 4
    }

    // Return the final 4-character Soundex code
    return soundexCode;
}
