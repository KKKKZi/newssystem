import { db } from '../db/index.js';// 导入数据库操作模块

/* 获取用户基本信息 */
const getUserInfo = (req, res) => {
  // 注意：req 对象上的 auth 属性，是 Token 解析成功，express-jwt 中间件挂载上去的
  const user = req.auth;
  // 根据用户的 id，查询用户的基本信息
  // ！！为了防止用户的密码泄露，需要排除 password 字段,通过as将password列替换为null
  const sql = 'select *, null as password from users where id=?';
  db.query(sql, user.id, (err, results) => {
    if (err) return res.cc(err);
    // 执行语句成功，但是查询到的数据条数不为1
    if (results.length !== 1) return res.cc('获取用户信息失败!');
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results[0]
    });
  });
};

/* 更新用户基本信息 */
const updateUserInfo = (req, res) => {
  const user = req.body;// 接受表单数据
};
export default {
  getUserInfo,
  updateUserInfo
};