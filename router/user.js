import express from 'express';
import expressJoi from '@escook/express-joi';// 导入验证数据合法性的中间件
import { upload } from '../utils/multer.js';
/* 路由处理函数 */
import userinfoHandler from '../router_handler/userinfo.js';
import { addCmt, deleteCmt, updCmt } from '../router_handler/comment.js';
/* 验证规则 */
import { update_userinfo_scheme, update_password_scheme } from '../scheme/user.js';// 导入验证规则
import { addcmt_scheme, delcmt_scheme, updcmt_scheme } from '../scheme/comment.js';

const router = express.Router();// 创建express的路由实例

/* 用户信息模块 */
// 获取用户信息
router.get('/userinfo', userinfoHandler.getUserInfo);
// 更新用户信息
router.post('/userinfo', upload.fields([{ name: 'avatar' }]), expressJoi(update_userinfo_scheme), userinfoHandler.updateUserInfo);
// 重置密码
router.post('/updpwd', expressJoi(update_password_scheme), userinfoHandler.updatePassword);

/* 评论模块 */
// 添加评论
router.post('/cmt', expressJoi(addcmt_scheme), addCmt);
// 删除评论
router.post('/delcmt', expressJoi(delcmt_scheme), deleteCmt);
// 修改评论
router.post('/updcmt', expressJoi(updcmt_scheme), updCmt);

export default {
  router
};