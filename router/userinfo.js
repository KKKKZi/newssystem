import express from 'express';

import userinfoHandler from '../router_handler/userinfo.js';

const router = express.Router();// 创建express的路由实例

// 获取用户信息
router.get('/userinfo', userinfoHandler.getUserInfo);

// 更新用户信息
router.post('/userinfo', userinfoHandler.updateUserInfo);


export default {
  router
};