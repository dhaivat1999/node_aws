const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipes");

router.get("/", (req, res) => {
  res.send("Recipes page");
});

router.get("/getAll", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
    //find() empty then will get all the post +.limit will limit the number of results
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", (req, res) => {
  // console.log(req.body);
  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    imageUrl:req.body.imageUrl,
    ingredients:req.body.ingredients
  });
  recipe
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ msg: "Error, could not save the recipe, please check all the mandatory fields" });
    });
});

router.get("/:postId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.postId);
    res.json(recipe);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete post
// router.delete("/:postId", async (req, res) => {
//   try {
//     const removePost = await Post.remove({ _id: req.params.postId });
//     res.json(removePost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// router.patch("/:postId", async (req, res) => {
//   try {
//     const updatedPost = await Post.updateOne(
//       { _id: req.params.postId },
//       { $set: { title: req.body.title } }
//     );
//     res.json(updatedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

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
