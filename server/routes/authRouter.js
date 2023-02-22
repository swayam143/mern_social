const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.post("/logout", authCtrl.logout);
router.post("/savedPost", authCtrl.getsavedPost);
router.post("/addsavedPost", authCtrl.savedPost);
router.post("/refresh_token", authCtrl.generateAccessToken);

module.exports = router;
