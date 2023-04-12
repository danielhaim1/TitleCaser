// src/index.js

// Import the TitleCaser class from the file src/TitleCaser.js.
import { TitleCaser } from './src/TitleCaser.js';

// Add a new method to the String prototype. This method will be available
// to all string objects. This is the method that will be used to convert
// a string to title case.
if ( String.prototype.toTitleCase === undefined ) {
	String.prototype.toTitleCase = function ( options ) {
		const titleCaser = new TitleCaser ( options );
		return titleCaser.toTitleCase ( this );
	};
}

// If the module is being used in a Node environment
if ( typeof module === 'object' && module.exports ) {
	module.exports = { TitleCaser };
}

// If the module is being used in a web environment
if ( typeof window !== 'undefined' && window.document ) {
	window.TitleCaser = TitleCaser;
}
