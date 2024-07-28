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
  searchUsers,
  getFollowers,
} = require("../controllers/users-controller");

router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
// router.get("/:id",getUser);
router.get("/:_id/getFollows", getFollow);
router.get("/:_id/getFollowers", getFollowers);
router.get("/", getUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);
router.post("/upload", upload.single("file"), uploadFileToGCS);
router.get("/search", searchUsers);  // Nueva ruta para la búsqueda de usuarios

router.patch('/update/:id',updateUser);



module.exports = router;
