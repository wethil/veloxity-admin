const Generator = require('yeoman-generator');

const fs = require('fs');
const { glob } = require('./utils/fileSystem.js');
const snakeCase = require('lodash/snakeCase');
const { Iterator } = require('./utils/Iterator.js')


module.exports = class extends Generator { 
  constructor(args, opts){
    super(args, opts);
    this.option('babel'); 
  }
 async initializing(){
    this.log('Welcome i18n Constant generator, this generatow will be i18n localization files based the keys on your JSON or JS files');
  }



  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "rawDirectory",
        message: "The directory containing your raw JSON or JS objects that will compose your i18n files by their keys",
        default: 'jsons' // Default to current folder name
      }, {
        type: "input",
        name: 'languages',
        message: " Write the languages that you want to compose as i18n files",
        default:'tr,en'
      }
    ]);
  } 

   async writing() {
     const { answers: { rawDirectory, languages }, contextRoot } = this;

     const getFileName = (language) => `${contextRoot}/i18n/${language}.json`
     
     const i18nDir = `${contextRoot}/i18n`

    fs.mkdirSync(i18nDir)
    const $rawDirectory = !!rawDirectory ? `${contextRoot}/${rawDirectory}` : rawDirectory; 
    this.log($rawDirectory, languages);
    const languagesArray = languages.split(',');

    const [ dirContent ] = await glob('**/*.json', {
      cwd: $rawDirectory,
     });
     const iterateOnFile = new Iterator();
     iterateOnFile.addMiddleware(snakeCase);

     dirContent.forEach(file => {
       this.log(file, 'file');
       const fileContent = this.fs.readJSON(`${contextRoot}/${rawDirectory}/${file}`);
       iterateOnFile.addContent(fileContent);
     });
     
     const finalArray = iterateOnFile.run();

     const result = {};
     languagesArray.forEach(language => {
       result[language] = {};

       finalArray.forEach(key => {
         result[language][key] = '';
       });

     })

     languagesArray.forEach(language => {
       this.fs.writeJSON(getFileName(language), result[language]);
     });
  }

  async end() {
    this.log('bye');
  }
};

