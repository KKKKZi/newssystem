import express from 'express';
import { addNewsType, updateNewsType, deleteNewsType } from '../router_handler/newstype.js';
import expressJoi from '@escook/express-joi';
import { newstype_scheme, update_newstype_scheme } from '../scheme/newstype.js';

const router = express.Router();

// 更新新闻类型
router.post('/updatenewstype', expressJoi(update_newstype_scheme), updateNewsType);
// 删除新闻类型
router.post('/deletenewstype', expressJoi(newstype_scheme), deleteNewsType);
// 增加新闻类型;
router.post('/addnewstype', expressJoi(newstype_scheme), addNewsType);

export default {
  router
};