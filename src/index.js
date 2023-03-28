import TitleCaser from './TitleCaser.js';
String.prototype.toTitleCase = function(options) {
    const titleCaser = new TitleCaser(options);
    return titleCaser.toTitleCase(this);
}