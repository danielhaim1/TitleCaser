const { describe, test, expect } = require('@jest/globals');
require('../index');

describe('toTitleCase', () => {
  test('capitalizes the first letter of each word by default', () => {
    const result = 'train your mind for peak performance: a science-based approach for achieving your goals'.toTitleCase();
    expect(result).toBe('Train Your Mind for Peak Performance: A Science-Based Approach for Achieving Your Goals');
  });

  test('uppercase the first word in the title', () => {
    const result = 'TRAIN your mind for peak performance'.toTitleCase();
    expect(result).toBe('TRAIN Your Mind for Peak Performance');
  });

  test('checks hyphenated words and last words', () => {
    const result = 'turning frowns (and smiles) upside down: a multilevel examination of surface acting positive and negative emotions on well-being'.toTitleCase();
    expect(result).toBe('Turning Frowns (and Smiles) Upside Down: A Multilevel Examination of Surface Acting Positive and Negative Emotions on Well-Being');
  });

  test('checks if the first word is capitalized', () => {
    const result = 'the quick brown fox jumps over the lazy dog'.toTitleCase();
    expect(result).toBe('The Quick Brown Fox Jumps Over the Lazy Dog');
  });

  test('checks for small words in the string', () => {
    const result = 'to be or not to be'.toTitleCase();
    expect(result).toBe('To Be or Not to Be');
  });

  test('check for options', () => {
    const result = 'the name of the musical is The Musical'.toTitleCase( { neverCapitalized: ["The Musical"] });
    expect(result).toBe('The Name of the Musical Is The Musical');
  });

  test('handles empty strings', () => {
    const result = ''.toTitleCase();
    expect(result).toBe('');
  });
});
