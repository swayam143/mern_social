const router = require("express").Router();
const commentCtrl = require("../controllers/commentCtrl");

router.post("/comment", commentCtrl.createComment);

router.post("/updatecomment", commentCtrl.updateComment);
router.post("/likeUnlike", commentCtrl.likeComment);

module.exports = router;
