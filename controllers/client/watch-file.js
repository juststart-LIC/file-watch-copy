const chokidar = require("chokidar");
const wfConfig = require("../../fwc.config");
const path = require("path");
const watchFilePaths = wfConfig.watchFile ? wfConfig.watchFile : [];
const uploadFile = require("./upload-file");
let watcher = chokidar.watch();
function initWatchFile() {
  watchFilePaths.forEach(filePath => {
    //兼容win
    filePath = filePath.path.replace(/\\/g, "/");
    watcher.add(filePath);
  });
  watcher.on("all", (operationType, operationTypeFilePath) => {
    let relativePath = path.relative(
      wfConfig.watchFile[0].path,
      operationTypeFilePath
    );
    uploadFile(
      operationType,
      operationTypeFilePath,
      relativePath,
      wfConfig.serverUrl
    );
  });
  watcher.on("error", () => {
    setTimeout(initWatchFile, 1000);
  });
  watcher.on("close", () => {
    setTimeout(initWatchFile, 1000);
  });
}

module.exports = initWatchFile;
