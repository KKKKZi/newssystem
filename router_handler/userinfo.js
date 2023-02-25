import { db } from '../db/index.js';// 导入数据库操作模块
import bcryptjs from 'bcryptjs';// 导入明文加密模块

/* 获取用户基本信息 */
const getUserInfo = async (req, res) => {
  // 注意：req 对象上的 auth 属性，是 Token 解析成功，express-jwt 中间件挂载上去的
  const user = req.auth;
  console.log(user);
  try {
    // 根据用户的 id，查询用户的基本信息
    // ！！为了防止用户的密码泄露，需要排除 password 字段,通过as将password列替换为null
    const [results] = await db.query('select *, null as password from users where id=?', user.id);
    // 执行语句成功，但是查询到的数据条数不为1
    if (results.length !== 1) return res.cc('获取用户信息失败!');
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results
    });
  } catch (err) {
    return res.cc(err);
  }
};
/* 更新用户基本信息 */
const updateUserInfo = async (req, res) => {
  const user = req.body;// 接收表单数据
  try {
    const sql = 'update users set xuehao=?,nickname=?,realname=?,phonenumber=?,email=?,avatar=? where id=?';
    const [results] = await db.query(sql,
      [user.xuehao, user.nickname, user.realname, user.phonenumber, user.email, req.files ? req.files.avatar[0].path : null, req.auth.id]);
    // console.log(req.files.avatar[0].path);
    // 执行操作成功，但是影响的行数不为1
    if (results.affectedRows !== 1) return res.cc("更新信息失败！");
    res.cc('更新信息成功！', 0);
  } catch (err) {
    return res.cc(err);
  }
};
/* 更新密码 */
// 普通用户更新密码需要验证原密码
const updatePassword = async (req, res) => {
  // 如果是普通用户则id来源于token，如果是管理员则id来源于表单提交数据
  try {
    const [results1] = await db.query('select * from users where id = ?', req.auth.id);
    if (results1.length !== 1) return res.cc('用户不存在!');
    // 判断旧密码是否输入正确
    if (!bcryptjs.compareSync(req.body.oldPwd, results1[0].password)) return res.cc('旧密码错误!');
    // // 更新密码
    const newPwd = bcryptjs.hashSync(req.body.newPwd, 10);// 明文加密
    const sql = 'UPDATE `users` SET password=? where id = ?';
    const [results2] = await db.query(sql, [newPwd, req.auth.id]);
    if (results2.affectedRows !== 1) return res.cc('更新密码失败！');
    res.cc('更新密码成功！', 0);
  } catch (error) {
    return res.cc(error);
  }
};
/* 重置密码 */
// 管理员根据用户id重置密码为123456
export const resetPassword = async (req, res) => {
  // 如果是普通用户则id来源于token，如果是管理员则id来源于表单提交数据
  try {
    const [results1] = await db.query('select * from users where id = ?', req.body.id);
    if (results1.length !== 1) return res.cc('用户不存在!');
    // // 更新密码
    const newPwd = bcryptjs.hashSync('123456', 10);// 明文加密
    const sql = 'UPDATE users SET password=? where id = ?';
    const [results2] = await db.query(sql, [newPwd, req.body.id]);
    if (results2.affectedRows !== 1) return res.cc('重置密码失败！');
    res.cc('重置密码成功！', 0);
  } catch (error) {
    return res.cc(error);
  }
};
export default {
  getUserInfo,
  updateUserInfo,
  updatePassword,
};