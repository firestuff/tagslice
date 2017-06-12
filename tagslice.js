'use strict';

class TagSlice {
	constructor(container) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'tagslice.json');
		xhr.responseType = 'json';
		xhr.onload = () => {
			console.log(xhr.response);
		};
		xhr.send();
	}
}
