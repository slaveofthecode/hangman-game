import express from 'express';
import controller from './controller.cjs';

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.post);

export default router;