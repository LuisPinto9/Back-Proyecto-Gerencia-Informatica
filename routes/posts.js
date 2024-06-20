const router = require("express").Router();
const {
  createPost,
  deletePost,
  getPost,
  likePost,
  timeline,
  updatePost,findusername,
} = require("../controllers/posts-controller");

router.post("/",createPost);
router.put("/:id",updatePost);
router.delete("/:id",deletePost);
router.put("/:id/like",likePost);
router.get("/:id",getPost);
router.get("/timeline/:userId",timeline);
router.get("/profile/:username",findusername);


module.exports = router;
