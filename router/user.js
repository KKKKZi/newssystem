import express from 'express';
import expressJoi from "@escook/express-joi";// 导入验证表单数据的中间件

// 导入路由处理函数
import userHandler from '../router_handler/user.js';

// 导入表单验证规则
import { reg_login_scheme } from '../scheme/user.js';// 导入注册登录的验证规则



const router = express.Router();// 创建路由对象

// 注册新用户
router.post('/reguser', expressJoi(reg_login_scheme), userHandler.reguser);

// 用户登录
router.post('/login', expressJoi(reg_login_scheme), userHandler.login);

export default {
  router
};