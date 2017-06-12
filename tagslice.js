'use strict';

class TagSlice {
	constructor(container) {
		this.buildDom_(container);
		this.loadJson_();
	}

	buildDom_(container) {
		let outer = document.createElement('outer');
		container.appendChild(outer);

		let taglist = document.createElement('taglist');
		outer.appendChild(taglist);
		taglist.innerText = 'tag!';

		let objectlist = document.createElement('objectlist');
		outer.appendChild(objectlist);
	}

	loadJson_() {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'tagslice.json');
		xhr.responseType = 'json';
		xhr.onload = () => {
			this.onJsonLoad_(xhr.response);
		};
		xhr.send();
	}

	onJsonLoad_(response) {
		console.log('foo', response);
	}
}
