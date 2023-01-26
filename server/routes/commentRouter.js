const router = require("express").Router();
const commentCtrl = require("../controllers/commentCtrl");

router.post("/comment", commentCtrl.createComment);

module.exports = router;
