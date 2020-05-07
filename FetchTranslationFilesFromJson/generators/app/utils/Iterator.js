const isObject = require('lodash/isObject');
const isArray = require('lodash/isArray');
const uniq = require('lodash/uniq');

class Iterator { 
  constructor() {
    this.content = [];
    this.list = [];
    this.middlewares = [];
  }

  addMiddleware(middlewares) {
    const addition = isArray(middlewares) ? middlewares : [middlewares];
    this.middlewares = this.middlewares.concat(addition);
  }

  addContent(content) {
    this.content = this.content.concat(content);
  }


  iteratingInfo(content) {
    const iteratingInfo = {};

    if (isArray(content)) {
      iteratingInfo.iterator = content;
      iteratingInfo.getiIteratingitem = (item) => item;
    }

    if (isObject(content)) {
      iteratingInfo.iterator = Object.keys(content);
      iteratingInfo.getiIteratingitem = (item) => content[item];
    }
    return iteratingInfo;
  }

  isIterable(item) {
    return isObject(item) || isArray(item);
  }

  getIterator(content) {
    if (isObject(content)) return Object.keys(content);
    if (isArray(content)) return content;
  }

  pushToList(item) {
    let $item = item;
    if (this.middlewares.length) {
      this.middlewares.forEach(middleware => {
        $item = middleware(item);
      });
    }
    this.list.push($item);
  }

  iterate(content = this.content) {
    const isIterable = this.isIterable(content);

    if (isIterable) {
      const { iterator, getiIteratingitem } = this.iteratingInfo(content);
      iterator.forEach(key => {
        const iteratingItem = getiIteratingitem(key);
        if (this.isIterable(iteratingItem)) {
          this.iterate(iteratingItem);
        } else {
          this.pushToList(key);
        }
      });
    }
    return this.list;
  }

  run() {
    return uniq(this.iterate());
  }
}

module.exports.Iterator = Iterator;