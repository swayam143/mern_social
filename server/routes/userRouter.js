const router = require("express").Router();
const multer = require("multer");

const auth = require("../middlewares/auth");

const userCtrl = require("../controllers/userCtrl");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //
    //Folder where we save images
    //
    cb(null, `public/upload/`);
  },
  filename: function (req, file, cb) {
    //
    //Name of the image we wants to save
    //
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/search", userCtrl.searchUser);
router.get("/user/:id", userCtrl.getUser);
router.post("/update", upload.single("picture"), userCtrl.updateUser);

module.exports = router;
