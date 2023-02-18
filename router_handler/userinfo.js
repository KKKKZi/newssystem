import { db } from '../db/index.js';// 导入数据库操作模块
import bcryptjs from 'bcryptjs';// 导入明文加密模块

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
  const user = req.body;// 接收表单数据
  const sql = 'update users set xuehao=?,nickname=?,realname=?,phonenumber=?,email=?,avatar=? where id=?';
  db.query(sql,
    [user.xuehao, user.nickname, user.realname, user.phonenumber, user.email, user.avatar, req.auth.id],
    (err, results) => {
      if (err) return res.cc(err);
      // 执行操作成功，但是影响的行数不为1
      if (results.affectedRows !== 1) return res.cc("更新信息失败！");
      res.cc('更新信息成功！', 0);
    });
};

/* 重置密码 */
// 普通用户重置密码需要验证原密码
// 管理员可以直接重置密码为123456
const updatePassword = (req, res) => {
  // 如果是普通用户则id来源于token，如果是管理员则id来源于表单提交数据
  const userid = req.auth.perm === 0 ? req.auth.id : req.body.id;
  // 根据用户id查询用户是否存在
  db.query('select * from users where id=?', userid, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc('用户不存在!');
    // 判断旧密码是否输入正确
    if (!bcryptjs.compareSync(req.body.oldPwd, results[0].password)) return res.cc('旧密码错误!');
    // 更新密码
    const newPwd = bcryptjs.hashSync(req.body.newPwd, 10);// 明文加密
    const sql = 'update users set password=? where id=?';
    db.query(sql, [newPwd, req.auth.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc('更新密码失败！');
      res.cc('更新密码成功！', 0);
    });
  });
};
export default {
  getUserInfo,
  updateUserInfo,
  updatePassword
};