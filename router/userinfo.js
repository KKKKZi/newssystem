import express from 'express';
import expressJoi from '@escook/express-joi';// 导入验证数据合法性的中间件

import userinfoHandler from '../router_handler/userinfo.js';
import { update_userinfo_scheme, update_password_scheme } from '../scheme/user.js';// 导入验证规则

const router = express.Router();// 创建express的路由实例

// 获取用户信息
router.get('/userinfo', userinfoHandler.getUserInfo);

// 更新用户信息
router.post('/userinfo', expressJoi(update_userinfo_scheme), userinfoHandler.updateUserInfo);

// 重置密码
router.post('/updatepwd', expressJoi(update_password_scheme), userinfoHandler.updatePassword);

export default {
  router
};