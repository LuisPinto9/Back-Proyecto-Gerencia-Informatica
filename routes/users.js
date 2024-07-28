const router = require("express").Router();
const { upload } = require("../utils/UploadFile");
const {
  deleteUser,
  followUser,
  getUser,
  unfollowUser,
  updateUser,
  getFollow,
  uploadFileToGCS,
} = require("../controllers/users-controller");

router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
// router.get("/:id",getUser);
router.get("/:_id/getFollows", getFollow);
router.get("/", getUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);
router.post("/upload", upload.single("file"), uploadFileToGCS);

router.patch('/update/:id',updateUser);



module.exports = router;
