import express, { urlencoded } from "express";// 导入express模块
import cors from "cors";// 导入cors中间件，解决跨域资源共享
import Joi from "joi";// 导入定义数据验证规则的模块
import { expressjwt } from "express-jwt";// 导入解析token的中间件

import config from "./config.js";// 导入配置文件
import userRouter from "./router/user.js";// 导入用户路由
import userinfoRouter from './router/userinfo.js';// 导入用户信息路由

const app = express();// 创建express服务器实例

// 将cors注册为全局中间件
app.use(cors());
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));
// 封装res.cc函数
app.use(function (req, res, next) {
  // status 默认为1表示失败
  // err可能是一个错误对象，也可能是一个字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    });
  };
  next();
});
// 在注册路由之前，配置解析token的中间件
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"], }).unless({ path: [/^\/api\//] }));

// 注册/api路由
app.use('/api', userRouter.router);
// 注册/my路由，以/my开头的接口都是需要权限的，需要token认证
app.use('/my', userinfoRouter.router);

// 错误中间件(放在所有中间件最后)
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof Joi.ValidationError) return res.cc(err);
  // 身份令牌token认证失败
  console.log(err);
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！');
  // 其他错误
  res.cc(err);
});

// 调用listen方法，指定端口号并启动服务器
app.listen(8080, () => {
  console.log('server running at http://127.0.0.1:8080');
});
