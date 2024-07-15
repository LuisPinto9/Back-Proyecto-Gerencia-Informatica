const User = require("../models/user-model");
const bcrypt = require("bcrypt");

//update user
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
};

//get a user
// exports.getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     const { password, updatedAt, ...other } = user._doc;
//     res.status(200).json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
exports.getFollow = async (req, res) => {
  const userId=req.params._id ;
  
  try {
    console.log("User ID:", userId);
    const user = await User.findById(userId)
    if (!user) {
      
      return res.status(404).json("User not found");
    }

    console.log("User found:", user);
    const follows = await Promise.all(
      user.followings.map(async (followings) => {
        return User.findById(followings._id)

        
      })
    );
    let friendList=[];
    follows.forEach((friend) => {
      if (friend) {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      }
    });
    console.log("Friend list:", friendList);
    // follows.map((friend)=>{
    //   const{_id, username, profilePicture}= friend
    //   friendList.push({_id, username, profilePicture});
    // });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

//amigos
exports.getUser = async (req, res) => {
  const userId=req.query.userId ;
  const username=req.query.username;
  try {
    const user = userId 
    ? await User.findById(userId)
    :  await User.findOne({username: username});
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};
//follow a user
exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.some(follower => follower._id.equals(req.body.userId))) {
        await user.updateOne({ $push: { followers: { _id: req.body.userId } } });
        await currentUser.updateOne({ $push: { followings: { _id: req.params.id } } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
};

//unfollow a user
exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.some(follower => follower._id.equals(req.body.userId))) {
        await user.updateOne({ $pull: { followers: { _id: req.body.userId } } });
        await currentUser.updateOne({ $pull: { followings: { _id: req.params.id } } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you don't follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't unfollow yourself");
  }
};
