const fwcConfig = require("../../fwc.config");
const fsExtra = require("fs-extra");
const fs = require("fs");
const fileSavePath = fwcConfig.fileSavePath;
function operationFile(fileData) {
  let {
    fileType,
    operationType,
    operationTypeFilePath,
    operationTypeFileStream,
    watchIndex
  } = fileData;
  if (!fileData) {
    return;
  }
  let fileIndex = parseInt(watchIndex);
  let saveFilePath = fileSavePath[fileIndex].path;
  const FilePath = saveFilePath + "/" + operationTypeFilePath;
  if (fileType == "dir" && operationType == "adddir") {
    createDir(FilePath);
  }

  if (fileType == "dir" && operationType == "unlinkdir") {
    deleteDir(FilePath);
  }

  if (
    fileType == "file" &&
    (operationType == "add" || operationType == "change")
  ) {
    operationTypeFileStream = operationTypeFileStream;
    createFile(FilePath, operationTypeFileStream);
  }

  if (fileType == "file" && operationType == "unlink") {
    deleteFile(FilePath);
  }
}
function createDir(operationTypeFilePath) {
  fsExtra.ensureDir(operationTypeFilePath);
}

function createFile(operationTypeFilePath, operationTypeFileStream) {
  // 将json化数据转成buffer，参考http://nodejs.cn/api/buffer/buf_tojson.html
  operationTypeFileStream = JSON.parse(
    operationTypeFileStream,
    (key, value) => {
      return value && value.type == "Buffer" ? Buffer.from(value) : value;
    }
  );
  fs.writeFile(operationTypeFilePath, operationTypeFileStream, () => {});
}

function deleteDir(operationTypeFilePath) {
  fsExtra.remove(operationTypeFilePath);
}

function deleteFile(operationTypeFilePath) {
  fsExtra.remove(operationTypeFilePath);
}

module.exports = operationFile;
