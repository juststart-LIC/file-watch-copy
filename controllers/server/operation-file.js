const fwcConfig = require("../../fwc.config");
const fsExtra = require("fs-extra");
const fs = require("fs");
const saveFilePath = fwcConfig.fileSavePath;
function operationFile(fileData) {
  console.log(fileData);
  const {
    fileType,
    operationType,
    operationTypeFilePath,
    operationTypeFileStream
  } = fileData;
  if (!fileData) {
    return;
  }
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
  fs.writeFile(operationTypeFilePath, operationTypeFileStream, () => {});
}

function deleteDir(operationTypeFilePath) {
  fsExtra.remove(operationTypeFilePath);
}

function deleteFile(operationTypeFilePath) {
  fsExtra.remove(operationTypeFilePath);
}

module.exports = operationFile;
