const router = require("express").Router();
const {deleteUser,followUser,getUser,unfollowUser,updateUser} = require("../controllers/users-controller");

router.put("/:id",updateUser);
router.delete("/:id",deleteUser);
router.get("/:id",getUser);
router.put("/:id/follow",followUser);
router.put("/:id/unfollow",unfollowUser);

module.exports = router;