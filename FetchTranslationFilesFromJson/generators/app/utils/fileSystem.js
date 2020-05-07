const fs = require('fs');
const { promisify } = require('@google-cloud/promisify');
const { glob } = require('glob')
module.exports.readDir = promisify(fs.readdir);
module.exports.glob = promisify(glob);

