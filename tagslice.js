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
		this.tagInclude_ = this.buildTagSection_(taglist, 'include');
		this.tagExclude_ = this.buildTagSection_(taglist, 'exclude');
		this.tagSortAsc_ = this.buildTagSection_(taglist, 'sort ⇣')
		this.tagSortDesc_ = this.buildTagSection_(taglist, 'sort ⇡')
	}

	buildTagSection_(container, title) {
		let tagsection = this.createElement_(container, 'tagsection');
		this.buildTag_(tagsection, title).classList.add('placeholder');
		return tagsection;
	}

	buildObjectList_(container) {
		let objectlist = document.createElement('objectlist');
		container.appendChild(objectlist);
	}

	buildTag_(container, name) {
		return this.createElement_(container, 'tag', name);
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
