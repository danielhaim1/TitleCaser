// Import the `TitleCaser` class
import { TitleCaser } from './TitleCaser.js';

// Add the `toTitleCase` method to the String prototype
if (typeof String.prototype.toTitleCase !== 'function') {
  String.prototype.toTitleCase = function(options) {
    const titleCaser = new TitleCaser(options);
    return titleCaser.toTitleCase(this);
  };
}

// Export the `TitleCaser` class for other modules to use
export { TitleCaser };

// Add the `TitleCaser` class to the global object in the browser environment
if (typeof window === 'object') {
  window.TitleCaser = TitleCaser;
}
