import { TitleCaser } from './src/TitleCaser.js';

if (String.prototype.toTitleCase === undefined) {
  String.prototype.toTitleCase = function (options) {
    const titleCaser = new TitleCaser(options);
    return titleCaser.toTitleCase(this);
  };
}

// Export for web environment
if (typeof window !== 'undefined' && window.document) {
  window.TitleCaser = TitleCaser;
}

// ESM exports
export { TitleCaser };
export default TitleCaser;
