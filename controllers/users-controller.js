const User = require("../models/user-model");
const bcrypt = require("bcrypt");


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


//a los que sigo
exports.getFollow = async (req, res) => {
  const userId = req.params._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }

    const follows = await Promise.all(
      user.followings.map(async (followings) => {
        return User.findById(followings._id);
      })
    );
    let friendList = [];
    follows.forEach((friend) => {
      if (friend) {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      }
    });
    
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};
//los que me sigue
exports.getFollowers = async (req, res) => {
  const userId = req.params._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }

    const followers = await Promise.all(
      user.followers.map(async (followers) => {
        return User.findById(followers._id);
      })
    );
    let followersList = [];
    followers.forEach((friend) => {
      if (friend) {
        const { _id, username, profilePicture } = friend;
        followersList.push({ _id, username, profilePicture });
      }
    });
    
    res.status(200).json(followersList);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (
        !user.followers.some((follower) => follower._id === req.body.userId)
      ) {
        await user.updateOne({
          $push: { followers: { _id: req.body.userId } },
        });
        await currentUser.updateOne({
          $push: { followings: { _id: req.params.id } },
        });
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

exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.some((follower) => follower._id === req.body.userId)) {
        await user.updateOne({
          $pull: { followers: { _id: req.body.userId } },
        });
        await currentUser.updateOne({
          $pull: { followings: { _id: req.params.id } },
        });
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

exports.uploadFileToGCS = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on("error", (err) => {
    console.error(err);
    res.status(500).send("Error uploading file");
  });

  blobStream.on("finish", async () => {
    try {
      const [url] = await blob.getSignedUrl({
        action: "read",
        expires: "01-01-2100",
      });

      res.status(200).send(`${url}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error generating signed URL");
    }
  });

  blobStream.end(req.file.buffer);
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updateInformation = req.body;

  try {
    await User.updateOne({ _id: id }, { $set: updateInformation });
    const updatedUser = await User.findById(id);
    res.status(200).json({ state: true, data: updatedUser });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.searchUsers = async (req, res) => {
  const query = req.query.username;
  try {
    const users = await User.find({ username: new RegExp(query, 'i') }).limit(10);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};


