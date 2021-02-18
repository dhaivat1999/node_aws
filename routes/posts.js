const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", (req, res) => {
  res.send("Post page");
});

router.get("/getAll", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
    //find() empty then will get all the post +.limit will limit the number of results
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", (req, res) => {
  // console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ msg: "Error, could not save the post" });
    });
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete post
router.delete("/:postId", async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.postId });
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// router.post('/',async (req,res)=>{
//      const post = new Post({
//         title : req.body.title,
//         description : req.body.description
//      })
//      try{
//         const savedPost = await post.save()
//         res.json(savedPost)
//      }
//      catch(err) {
//          res.json({message : err});
//      }
// })

module.exports = router;
