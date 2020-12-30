const operationFile = require("./operation-file");
function receiveFile(ctx) {
  operationFile(ctx.request.body);
}
module.exports = receiveFile;
