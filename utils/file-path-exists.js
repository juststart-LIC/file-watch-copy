const fs = require("fs");
function isExistsFilePath(path) {
  return fs.existsSync(path);
}
module.exports = isExistsFilePath;
