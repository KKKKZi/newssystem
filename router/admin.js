import express from 'express';
import expressJoi from '@escook/express-joi';

import { upload } from '../utils/multer.js';
/* 接收验证规则 */
import { addnews_scheme, deletenews_scheme, updatenews_scheme } from '../scheme/news.js';
import { newstype_scheme, update_newstype_scheme } from '../scheme/newstype.js';
import { deleteswiper_scheme, updateswiper_scheme } from '../scheme/swiper.js';
import { resetpwd_scheme } from '../scheme/user.js';
import { delcmt_scheme } from '../scheme/comment.js';
import { addblogroll_scheme, delblogroll_scheme, updblogroll_scheme } from '../scheme/blogroll.js';
/* 导入路由处理函数 */
import { addNews, deleteNews, updateNews } from '../router_handler/news.js';
import { addNewsType, updateNewsType, deleteNewsType } from '../router_handler/newstype.js';
import { addSwiper, deleteSwiper, updateSwiper } from '../router_handler/swiper.js';
import { resetPassword } from '../router_handler/userinfo.js';
import { getcmtList, deleteCmt } from '../router_handler/comment.js';
import { addBlogroll, delBlogroll, updBlogroll } from '../router_handler/blogroll.js';

const router = express.Router();

/* 用户管理模块 */
router.post('/resetpwd', expressJoi(resetpwd_scheme), resetPassword);

/* 新闻模块 */
// 添加新闻
router.post('/news', upload.fields([{ name: 'image' }, { name: 'video' }, { name: 'file' }]), expressJoi(addnews_scheme), addNews);
// 删除新闻
router.post('/delnews', expressJoi(deletenews_scheme), deleteNews);
// 修改新闻
router.post('/updnews', upload.fields([{ name: 'image' }, { name: 'video' }, { name: 'file' }]), expressJoi(updatenews_scheme), updateNews);

/* 新闻类型模块 */
// 更新新闻类型
router.post('/updnewstype', expressJoi(update_newstype_scheme), updateNewsType);
// 删除新闻类型
router.post('/delnewstype', expressJoi(newstype_scheme), deleteNewsType);
// 增加新闻类型;
router.post('/addnewstype', expressJoi(newstype_scheme), addNewsType);

/* 轮播图模块 */
router.post('/swiper', upload.fields([{ name: 'swiper' }]), addSwiper);
router.post('/delswiper', expressJoi(deleteswiper_scheme), deleteSwiper);
router.post('/updswiper', upload.fields([{ name: 'swiper' }]), expressJoi(updateswiper_scheme), updateSwiper);

/* 评论模块 */
// 管理员获取所有评论
router.get('/cmt', getcmtList);
// 删除评论
router.post('/delcmt', expressJoi(delcmt_scheme), deleteCmt);

/* 友情链接 */
// 添加
router.post('/addblogroll', expressJoi(addblogroll_scheme), addBlogroll);
// 删除
router.post('/delblogroll', expressJoi(delblogroll_scheme), delBlogroll);
// 修改
router.post('/updblogroll', expressJoi(updblogroll_scheme), updBlogroll);

export default {
  router
};