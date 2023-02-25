import express from 'express';
import expressJoi from "@escook/express-joi";// 导入验证表单数据的中间件

/* 导入路由处理函数 */
import userHandler from '../router_handler/user.js';// 导入路由处理函数
import { getNews, getNewsList } from '../router_handler/news.js';
import { getNewsType } from '../router_handler/newstype.js';
import { getSwiper } from '../router_handler/swiper.js';
import { getcmtByNews } from '../router_handler/comment.js';
import { getBlogroll } from '../router_handler/blogroll.js';
/* 导入验证规则 */
import { reg_login_scheme } from '../scheme/user.js';// 导入注册登录的验证规则
import { getnews_scheme } from '../scheme/news.js';
import { getcmtbynews_scheme } from '../scheme/comment.js';

const router = express.Router();// 创建路由对象

/* 注册登录模块 */
// 注册新用户
router.post('/reguser', expressJoi(reg_login_scheme), userHandler.reguser);
// 用户登录
router.post('/login', expressJoi(reg_login_scheme), userHandler.login);

/* 新闻模块 */
// 根据id获取新闻
router.get('/news', expressJoi(getnews_scheme), getNews);
// 获取新闻列表
router.get('/newslist', getNewsList);

/* 新闻信息模块 */
// 获取新闻类型
router.get('/newstype', getNewsType);

/* 轮播图模块 */
// 获取轮播图列表
router.get('/swiper', getSwiper);

/* 评论模块 */
router.get('/cmtbynews', expressJoi(getcmtbynews_scheme), getcmtByNews);

/* 友情链接 */
// 获取友情链接列表
router.get('/blogroll', getBlogroll);

export default {
  router
};