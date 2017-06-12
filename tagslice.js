'use strict';

class TagSlice {
	constructor(container) {
		this.buildDom_(container);
		this.loadJson_();
	}

	createElement_(container, tagName, text) {
		let elem = document.createElement(tagName);
		container.appendChild(elem);
		if (text) {
			elem.innerText = text;
		}
		return elem;
	}

	buildDom_(container) {
		let outer = this.createElement_(container, 'outer');
		this.buildTagList_(outer);
		this.buildObjectList_(outer);
	}

	buildTagList_(container) {
		let taglist = this.createElement_(container, 'taglist');
		this.tagInclude_ = this.buildTagSection_(taglist, 'Include');
		this.tagExclude_ = this.buildTagSection_(taglist, 'Exclude');
		this.tagSortAsc_ = this.buildTagSection_(taglist, 'Sort (ascending)')
		this.tagSortDesc_ = this.buildTagSection_(taglist, 'Sort (descending)')
	}

	buildTagSection_(container, title) {
		let tagsection = this.createElement_(container, 'tagsection');
		let tagsectiontitle = this.createElement_(tagsection, 'tagsectiontitle', title);
	}

	buildObjectList_(container) {
		let objectlist = document.createElement('objectlist');
		container.appendChild(objectlist);
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
