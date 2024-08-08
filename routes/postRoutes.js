import express from "express";
import {
    createPost,
    deletePost,
    getPost,
    likeUnlikePost,
    replyToPost,
    getFeedPosts,
    getUserPosts,
    getFilteredPosts, // Nueva función para obtener posts filtrados
} from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.get("/filteredPosts", protectRoute, getFilteredPosts); // Nueva ruta para obtener posts filtrados
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);

export default router;
