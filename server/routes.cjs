/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const controller = require('./controller.cjs');

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.post);

export default router;