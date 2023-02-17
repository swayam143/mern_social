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
router.get("/userposts/:id", postCtrl.userPost);
router.post("/discoverposts", postCtrl.getAllPost);
router.get("/detailposts/:id", postCtrl.detailPost);
router.get("/posts/:id", postCtrl.getPosts);
router.post("/updatedposts", upload.single("picture"), postCtrl.updatePost);
router.post("/likePost", postCtrl.likePost);
router.post("/unlikePost", postCtrl.unlikePost);
router.post("/delposts", postCtrl.DeletePost);
router.post("/savedPost", postCtrl.savedPost);

module.exports = router;
