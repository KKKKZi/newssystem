import { db } from '../db/index.js';// 导入数据库操作模块
import bcryptjs from 'bcryptjs';// 导入bcrtptjs对密码进行明文加密
import Jwt from 'jsonwebtoken';// 导入生成jwt认证的token模块
import config from '../config.js';// 导入配置文件

/* 注册用户 */
// 1. 检测表单数据是否合法
// 2. 检测用户名是否被占用
// 3. 对密码进行加密处理
// 4. 插入新用户
const reguser = async (req, res) => {
  const userinfo = req.body;// 接受表单数据
  // 1. 检测表单数据是否合法
  if (!userinfo.username || !userinfo.password) return res.cc('用户名和密码不能为空！');
  // 2. 检测用户名是否被占用
  try {
    // 执行 SQL 语句并根据结果判断用户名是否被占用
    const [results1] = await db.query('select * from users where username = ?', userinfo.username);
    if (results1.length > 0) return res.cc('用户名被占用，请更换其他用户名！');
    // 用户名不存在可以继续操作
    // 明文密码加密  hashSync(明文密码, 随机盐长度)
    userinfo.password = bcryptjs.hashSync(userinfo.password, 10);
    const [results2] = await db.query('insert into users set username = ?, password = ?', [userinfo.username, userinfo.password]);
    //  SQL 语句执行成功，但影响行数不为 1
    if (results2.affectedRows !== 1) return res.cc('注册用户失败!');
    res.cc('注册用户成功！', 0);
  } catch (err) {
    return res.cc(err);
  }
};

/* 用户登录处理函数 */
// 1. 检测表单数据是否合法;
// 2. 根据用户名查询用户的数据;
// 3. 判断用户输入的密码是否正确;
// 4. 生成 JWT 的 Token 字符串;
const login = async (req, res) => {
  const userinfo = req.body;// 接受表单数据
  // 根据用户名查询用户的数据
  const sql = 'select * from users where username = ?';
  try {
    const [results] = await db.query(sql, userinfo.username);
    // 执行语句成功，但是获取到数据不为1
    if (results.length !== 1) return res.cc('用户名不存在！');
    // 匹配密码是否相同，因为密码使用了bcryptjs加密，所以要使用compareSync方法进行比较
    const compareResult = bcryptjs.compareSync(userinfo.password, results[0].password);
    if (!compareResult) return res.cc('密码错误！');
    // 生成JWT认证的token字符串，token需要剔除密码和头像的值
    console.log(results);
    const user = { ...results, password: '', avatar: '' };
    // 使用Jwt.sign(源对象,jwt密钥,配置对象)
    const tokenStr = Jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '10h'// 设置token令牌有效期是10小时
    });
    // 将生成的 Token 字符串响应给客户端
    res.send({
      status: 0,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer' + tokenStr
    });
  } catch (err) {
    return res.cc(err);// 判断执行sql语句是否成功
  }
};

export default {
  reguser,
  login
};