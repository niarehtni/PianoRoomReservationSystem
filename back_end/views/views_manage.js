const Router = require("koa-router");
const router = new Router();

const manage_login = require("./manage/login");
const manage_info = require("./manage/info");
const manage_logout = require("./manage/logout");
const manage_notice = require("./manage/notice");
const manage_item = require("./manage/item");
const manage_user = require("./manage/user");
const manage_room = require("./manage/piano");

router.use("/manager/login", manage_login.routes(), manage_login.allowedMethods());
router.use("/manager/info", manage_info.routes(), manage_info.allowedMethods());
router.use("/manager/logout", manage_logout.routes(), manage_logout.allowedMethods());
router.use("/manager/notice", manage_notice.routes(), manage_notice.allowedMethods());
router.use("/manager/item", manage_item.routes(), manage_item.allowedMethods());
router.use("/manager/user", manage_user.routes(), manage_user.allowedMethods());
router.use("/manager/room", manage_room.routes(), manage_room.allowedMethods());


module.exports = router;