import express from 'express';
import { commentPost, createPost, deletePost, getPost, getPosts, getPostsBySearch, likePost, updatePost } from '../controllers/posts.js';
import auth from '../middleWare/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);

router.patch('/:id', auth, updatePost);
router.get('/:id', getPost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likepost', auth, likePost);


router.post('/:id/commentPost', auth, commentPost);







export default router;