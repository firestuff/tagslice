'use strict';

class TagSlice {
	constructor(container) {
		this.buildDom_(container);
		addEventListener('hashchange', () => this.parseUrl_());
		this.parseUrl_();
		this.loadJson_();
    this.registerKeys_();
	}

  registerKeys_() {
		document.addEventListener('keypress', (e) => {
      switch (e.key) {
        case 'r':
          this.loadJson_();
          break;

        case 'x':
				  this.tagList_.classList.toggle('expandAll');
          break;
			}
		});
  }

	createElement_(container, tagName, text) {
		let elem = document.createElement(tagName);
		container.appendChild(elem);
		if (text) {
			elem.innerText = text;
		}
		return elem;
	}

	createTag_(container, tagName) {
		let elem = this.createElement_(container, 'tag');
		this.createElement_(elem, 'tagName', tagName);
		return elem;
	}

	createCard_(container, object) {
		let elem = this.createElement_(container, 'card');
		let title = this.createElement_(elem, 'cardTitle', object['title']);
		title.addEventListener('click', () => {
			elem.classList.toggle('expanded');
		});
		let detail = this.createElement_(elem, 'cardDetail');
		for (let sectionName in object['content']) {
			let section = this.createElement_(detail, 'cardSection');
      if (sectionName) {
			  this.createElement_(section, 'cardSectionTitle', sectionName);
      }
			this.createElement_(section, 'cardSectionText', object['content'][sectionName]);
		}
    if (object['references']) {
      let refList = this.createElement_(detail, 'referenceList');
      for (let refName in object['references']) {
        let ref = this.createElement_(refList, 'a', refName);
        ref.href = object['references'][refName];
      }
    }
	}

	parseUrl_() {
		this.tags_ = [];
		let hash = window.location.hash.substr(1);
    if (hash) {
		  for (let tag of hash.split(',')) {
			  this.tags_.push(decodeURIComponent(tag));
		  }
    }
    let query = window.location.href.split('?', 2)[1];
    if (query) {
      query = query.split('#', 1)[0];
      for (let tag of query.split(',')) {
			  this.tags_.push(decodeURIComponent(tag));
      }
    }
		document.title = this.tags_.join(', ');
		this.maybeRender_();
	}

	buildDom_(container) {
		this.tagList_ = this.createElement_(container, 'tagList');
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
		this.objects_ = response;
		this.maybeRender_();
	}

	maybeRender_() {
		if (!this.tags_ || !this.objects_) {
			return;
		}
		this.tagList_.innerHTML = '';
		for (let tag of this.tags_) {
			let elem = this.createTag_(this.tagList_, tag);
			for (let object of this.objects_) {
				if (object['tags'].includes(tag)) {
					this.createCard_(elem, object);
				}
			}
		}
	}
}
