import express from 'express';
import expressJoi from '@escook/express-joi';
import { addnews_scheme, deletenews_scheme, updatenews_scheme } from '../scheme/news.js';
import { addNews, deleteNews, updateNews } from '../router_handler/news.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

// 添加新闻
router.post('/news', upload, expressJoi(addnews_scheme), addNews);
// 删除新闻
router.post('/deletenews', expressJoi(deletenews_scheme), deleteNews);
// 修改新闻
router.post('/deletenews', upload, expressJoi(updatenews_scheme), updateNews);


export default {
  router
};