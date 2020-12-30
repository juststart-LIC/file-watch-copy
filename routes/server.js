const router = require("koa-router")();
const receiveFile = require("../controllers/server/receive-file");
router.prefix("/");
router.post("/receiveFile", receiveFile);
module.exports = router;
