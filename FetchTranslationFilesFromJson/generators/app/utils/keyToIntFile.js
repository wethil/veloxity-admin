const uniq = require('lodash/uniq');
const flatttenDeep = require('lodash/flattenDeep');
const snakeCase = require('lodash/snakeCase');

const keyToIntFile = (content) => {
  console.log(content, 'content');
  // const jsonizedContent = JSON.parse(content)[0];
  let intFileContent = {};
  const keys = uniq(flatttenDeep(Object.keys(content)));

  if (keys.length) {
    keys.forEach(key=>{
      intFileContent[snakeCase(key)] = '';
    });
  }
  return intFileContent;
}

module.exports.keyToIntFile = keyToIntFile;
