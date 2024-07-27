const Post = require("../models/post-model");
const User = require("../models/user-model"); //toca revisar esto
const uploadFile = require("../service/uploadFileBucket");

//create a post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    if (req.file) {
      const urlImage = await uploadFile(req.file)
      newPost.img = urlImage;
    }
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update a post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//like / dislike a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post)
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//get a post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get timeline posts
exports.timeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map(async (friendId) => {
        const posts = await Post.find({ userId: friendId });
        if (!posts.length) {
          // Si no hay publicaciones para este amigo, se puede manejar aquí
          console.log(`No posts found for friend with id ${friendId}`);
        }
        return posts;
      })
    );

    // Verificar si friendPosts está vacío
    const flatFriendPosts = friendPosts.flat(); // Aplanar el array de arrays
    if (flatFriendPosts.length === 0) {
      return res.status(404).json({ message: "No friend posts found" });
    }

    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};
// exports.timeline = async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.params.userId);
//     console.log(req.params.userId)

//     const userPosts = await Post.find({ userId: currentUser._id });
//     const friendPosts = await Promise.all(

//       currentUser.followings.map((friendId) => {
//         return Post.find({ userId: friendId });
//       })
//     );
//     if(friendPosts){

//     }
//     res.json(userPosts.concat(...friendPosts));
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };




//funcion de push de comentario

exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const comment = req.body.text; 
      post.comments.push(comment); 
      await post.save();
      res.status(200).json(post); 
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//get timeline posts
exports.findusername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllPosts = async (req, res) =>{
  try{
    const posts = await Post.find({});
    res.status(200).json(posts);
  }catch(err){
    res.status(500).json(err);
  }
} 