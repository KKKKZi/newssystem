import express from 'express';
import { getNewsType } from '../router_handler/newstype.js';

const router = express.Router();

// 获取新闻类型
router.get('/newstype', getNewsType);

export default {
  router
};