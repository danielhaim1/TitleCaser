import { TitleCaser } from './src/TitleCaser.js';
import { TitleCaserConfig, createTitleCaserConfig, TITLE_CASER_CONFIG_DEFAULTS } from './src/TitleCaserConfig.js';

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
export { TitleCaser, TitleCaserConfig, createTitleCaserConfig, TITLE_CASER_CONFIG_DEFAULTS };
export default TitleCaser;
