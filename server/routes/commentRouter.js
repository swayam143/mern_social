const router = require("express").Router();
const commentCtrl = require("../controllers/commentCtrl");

router.post("/comment", commentCtrl.createComment);

router.post("/updatecomment", commentCtrl.updateComment);
router.post("/likeUnlike", commentCtrl.likeComment);
router.post("/replyComment", commentCtrl.replyComment);
router.post("/deleteComment", commentCtrl.deleteComment);
router.post("/updateReplycomment", commentCtrl.updateReplyComment);

module.exports = router;
