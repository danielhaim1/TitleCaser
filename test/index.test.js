const {
    describe,
    test,
    expect
} = require('@jest/globals');

const {
    toTitleCase
} = require('../index');

describe('String.prototype.toTitleCase', () => {

    test('throws TypeError if input is not a string', () => {
        expect(() => {
            toTitleCase(null);
        }).toThrow(TypeError);
    });

    test('throws TypeError if options is not an object', () => {
        expect(() => {
            'hello world'.toTitleCase('invalid option');
        }).toThrow(TypeError);
    });

    test('capitalizes the first letter of each word in a sentence', () => {
        const result = 'train your mind for peak performance: a science-based approach for achieving your goals'.toTitleCase();
        expect(result).toBe('Train Your Mind for Peak Performance: A Science-Based Approach for Achieving Your Goals');
    });

    test('capitalizes the first letter of the first word in a sentence', () => {
        const result = 'TRAIN your mind for peak performance'.toTitleCase();
        expect(result).toBe('TRAIN Your Mind for Peak Performance');
    });

    test('handles hyphenated words and last words in a sentence', () => {
        const result = 'turning frowns (and smiles) upside down: a multilevel examination of surface acting positive and negative emotions on well-being'.toTitleCase();
        expect(result).toBe('Turning Frowns (and Smiles) Upside Down: A Multilevel Examination of Surface Acting Positive and Negative Emotions on Well-Being');
    });

    test('capitalizes the first word of a sentence', () => {
        const result = 'the quick brown fox jumps over the lazy dog'.toTitleCase();
        expect(result).toBe('The Quick Brown Fox Jumps Over the Lazy Dog');
    });

    test('capitalizes all significant words in a sentence', () => {
        const result = 'to be or not to be'.toTitleCase();
        expect(result).toBe('To Be or Not to Be');
    });

    test('excludes specific words from capitalization', () => {
        const result = 'the name of the musical is The Musical'.toTitleCase({
            neverCapitalized: ["The Musical"]
        });
        expect(result).toBe('The Name of the Musical Is The Musical');
    });

    test('capitalizes significant words with Chicago style', () => {
        const myString = "the quick rabbit together with the brown fox jumped over the dog";
        const result = myString.toTitleCase({
            style: "chicago"
        });
        expect(result).toBe('The Quick Rabbit Together with the Brown Fox Jumped over the Dog');
    });

    test('does not modify already capitalized words', () => {
        const result = 'The Quick Brown Fox Jumps Over the Lazy Dog'.toTitleCase();
        expect(result).toBe('The Quick Brown Fox Jumps Over the Lazy Dog');
    });

    test('returns an empty string for empty input', () => {
        const result = ''.toTitleCase();
        expect(result).toBe('');
    });
});