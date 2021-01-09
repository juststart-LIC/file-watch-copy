const chokidar = require("chokidar");
const wfConfig = require("../../fwc.config");
const path = require("path");
const watchFilePaths = wfConfig.watchFile ? wfConfig.watchFile : [];
const serverUrls = wfConfig.serverUrls ? wfConfig.serverUrls : [];
const uploadFile = require("./upload-file");
let watcher = chokidar.watch();
function initWatchFile() {
  watchFilePaths.forEach(filePath => {
    //兼容win
    filePath = filePath.path.replace(/\\{1}/g, "/");
    watcher.add(filePath);
  });
  watcher.on("all", (operationType, operationTypeFilePath) => {
    let watchIndex = 0,
      CommonOperationTypeFilePath = operationTypeFilePath.replace(
        /\\{1}/g,
        "/"
      );
    wfConfig.watchFile.forEach(filepath => {
      let pathPositionIndex = CommonOperationTypeFilePath.indexOf(
        filepath.path
      );
      if (pathPositionIndex > -1) {
        watchIndex = pathPositionIndex;
      }
    });
    let relativePath = path.relative(
        wfConfig.watchFile[watchIndex].path,
        operationTypeFilePath
      ),
      serverUrl = serverUrls[watchIndex].serverUrl;

    uploadFile(
      operationType,
      operationTypeFilePath,
      relativePath,
      serverUrl,
      watchIndex
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
