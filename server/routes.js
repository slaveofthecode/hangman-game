import express from 'express';
import controller from './controller.js';

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.post);

export default router;