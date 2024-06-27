const router = require("express").Router();
const {deleteUser,followUser,getUser,unfollowUser,updateUser,getFollow} = require("../controllers/users-controller");

router.patch("/:id",updateUser);
router.delete("/:id",deleteUser);
// router.get("/:id",getUser);
router.get("/:_id/getFollows",getFollow);
router.get("/",getUser);
router.put("/:id/follow",followUser);
router.put("/:id/unfollow",unfollowUser);

module.exports = router;