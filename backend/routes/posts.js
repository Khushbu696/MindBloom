const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  toggleLike,
} = require("../controllers/postController");

router.get("/", getPosts);

router.post("/", createPost);

router.patch("/like/:id", toggleLike);

module.exports = router;
