const router = require("express").Router();
const multer = require("multer");
const postCtrl = require("../controllers/postCtrl");

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

router.post("/posts", upload.single("picture"), postCtrl.createPost);
router.get("/posts/:id", postCtrl.getPosts);
router.post("/updatedposts", postCtrl.updatePost);

module.exports = router;
