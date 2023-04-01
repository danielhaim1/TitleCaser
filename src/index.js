import { TitleCaser } from './TitleCaser.js';

if (typeof String.prototype.toTitleCase !== 'function') {
  String.prototype.toTitleCase = function(options) {
    const titleCaser = new TitleCaser(options);
    return titleCaser.toTitleCase(this);
  };
}

export { TitleCaser };

if (typeof window === 'object') {
  window.TitleCaser = TitleCaser;
}
