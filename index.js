import { TitleCaser } from './src/TitleCaser.js';

if ( String.prototype.toTitleCase === undefined ) {
	String.prototype.toTitleCase = function ( options ) {
		const titleCaser = new TitleCaser ( options );
		return titleCaser.toTitleCase ( this );
	};
}

// Export for Node.js environment
if ( typeof module === 'object' && module.exports ) {
	module.exports = { TitleCaser };
}

// Export for web environment
if ( typeof window !== 'undefined' && window.document ) {
	window.TitleCaser = TitleCaser;
}
