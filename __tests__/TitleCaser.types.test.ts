import { TitleCaser, TitleCaserOptions } from '../index.js';

describe('TitleCaser TypeScript Definitions', () => {
  
  describe('Constructor Options', () => {
    test('should accept all valid options without type errors', () => {
      // Test all the fields that were missing in the original type definitions
      const options: TitleCaserOptions = {
        style: 'ap',
        smartQuotes: true,
        neverCapitalize: ['iOS', 'macOS', 'jQuery'],
        wordReplacementsList: [
          { 'js': 'JavaScript' },
          { 'css': 'CSS' }
        ],
        debug: true
      };

      const titleCaser = new TitleCaser(options);
      expect(titleCaser).toBeInstanceOf(TitleCaser);
    });

    test('should accept british style (newly added)', () => {
      const titleCaser = new TitleCaser({ style: 'british' });
      expect(titleCaser).toBeInstanceOf(TitleCaser);
    });

    test('should work with neverCapitalize option', () => {
      const titleCaser = new TitleCaser({ 
        neverCapitalize: ['iPhone', 'macOS'] 
      });
      
      const result = titleCaser.toTitleCase('iphone and macos support');
      expect(result).toContain('iPhone');
      expect(result).toContain('macOS');
    });

    test('should work with wordReplacementsList option', () => {
      const titleCaser = new TitleCaser({
        wordReplacementsList: [
          { 'js': 'JavaScript' },
          { 'css': 'CSS' }
        ]
      });
      
      const result = titleCaser.toTitleCase('learning js and css');
      expect(result).toContain('JavaScript');
      expect(result).toContain('CSS');
    });
  });

  describe('Class Methods', () => {
    test('should have all expected methods', () => {
      const titleCaser = new TitleCaser();
      
      // Test that methods exist and have correct signatures
      expect(typeof titleCaser.toTitleCase).toBe('function');
      expect(typeof titleCaser.setReplaceTerms).toBe('function');
      expect(typeof titleCaser.addReplaceTerm).toBe('function');
      expect(typeof titleCaser.removeReplaceTerm).toBe('function');
      expect(typeof titleCaser.addExactPhraseReplacements).toBe('function');
      expect(typeof titleCaser.setStyle).toBe('function'); // Previously missing
    });

    test('setStyle method should work', () => {
      const titleCaser = new TitleCaser({ style: 'ap' });
      
      // This should not throw a type error
      titleCaser.setStyle('apa');
      
      const result = titleCaser.toTitleCase('a test of the system');
      expect(typeof result).toBe('string');
    });

    test('should properly type replacement methods', () => {
      const titleCaser = new TitleCaser();
      
      // Test setReplaceTerms with proper typing
      titleCaser.setReplaceTerms([
        { 'test': 'Test' },
        { 'api': 'API' }
      ]);
      
      // Test addReplaceTerm
      titleCaser.addReplaceTerm('css', 'CSS');
      
      // Test removeReplaceTerm
      titleCaser.removeReplaceTerm('test');
      
      // Test addExactPhraseReplacements
      titleCaser.addExactPhraseReplacements([
        { 'new york': 'New York' }
      ]);
      
      const result = titleCaser.toTitleCase('api and css in new york');
      expect(typeof result).toBe('string');
    });
  });

  describe('Type Safety', () => {
    test('should enforce style union type', () => {
      // These should compile without errors
      const validStyles: Array<TitleCaserOptions['style']> = [
        'ap', 'apa', 'chicago', 'wikipedia', 'nyt', 'british'
      ];
      
      validStyles.forEach(style => {
        const titleCaser = new TitleCaser({ style });
        expect(titleCaser).toBeInstanceOf(TitleCaser);
      });
    });

    test('should properly type boolean options', () => {
      const options: TitleCaserOptions = {
        smartQuotes: true,
        debug: false
      };
      
      const titleCaser = new TitleCaser(options);
      expect(titleCaser).toBeInstanceOf(TitleCaser);
    });

    test('should properly type array options', () => {
      const options: TitleCaserOptions = {
        neverCapitalize: ['string', 'array'],
        wordReplacementsList: [{ 'key': 'value' }]
      };

      const titleCaser = new TitleCaser(options);
      expect(titleCaser).toBeInstanceOf(TitleCaser);
    });
  });
});