const KoaRouter = require("koa-router");
const router = new KoaRouter();
const koaCompose = require("koa-compose");
const home = require("../controllers/home");
const md = require("../controllers/md");
const snatch = require("../controllers/snatch");
const qiniu = require("../controllers/qiniu");
const wate = require("../controllers/wate");
const upload = require("../controllers/upload");
// const db = require("../controllers/db");

module.exports = () => {
    router.get("/", home.fe);
    router.get("/backend", home.backend);
    router.get("/getData.jsonp", home.getJSON);
    router.get("/md", md.index);
    router.get("/snatch", snatch.book);
    router.post("/qiniu/post", qiniu.post);
    router.get("/qiniu/list", qiniu.list);
    router.get("/wate", wate.wate);
    router.get("/upload", upload.fileUpload);
    // router.get("/db", db.index);
    return koaCompose([router.routes(), router.allowedMethods()]);
};
