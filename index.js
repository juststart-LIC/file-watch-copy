const Koa = require("koa");
const app = new Koa();
const koaBody = require("koa-body");
const wfConfig = require("./fwc.config");
const initWatchFile = require("./controllers/client/watch-file.js");
const serverRouter = require("./routes/server");
const getMode = require("./utils/mode");
// const serverCopyFile = require("./controllers/server/");
const modes = getMode(wfConfig.mode);
if (modes.includes("server")) {
  app.use(
    koaBody({
      encoding: "latin1",
      multipart: true // 允许上传多个文件
    })
  );
  app.use(serverRouter.routes());
}
if (modes.includes("client")) {
  initWatchFile();
}

app.listen(9100);
