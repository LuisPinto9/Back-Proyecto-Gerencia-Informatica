const router = require("express").Router();
const {deleteUser,followUser,getUser,unfollowUser,updateUser,getFollow,uploadFileToGCS} = require("../controllers/users-controller");

router.patch("/:id",updateUser);
router.delete("/:id",deleteUser);
// router.get("/:id",getUser);
router.get("/:_id/getFollows",getFollow);
router.get("/",getUser);
router.put("/:id/follow",followUser);
router.put("/:id/unfollow",unfollowUser);
routes.post("/upload", upload.single("file"), uploadFileToGCS);



module.exports = router;