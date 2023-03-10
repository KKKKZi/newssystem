import Joi from 'joi';// 导入  定义表单规则  的模块
/**
* string() 值必须是字符串
* alphanum() 值只能是包含 a-zA-Z0-9 的字符串
* min(length) 最小长度
* max(length) 最大长度
* required() 值是必填项，不能为 undefined
* pattern(正则表达式) 值必须符合正则表达式的规则
*/

// id的验证规则
const id = Joi.number().integer().min(1).required();


// 用户名的验证规则
const username = Joi.string().alphanum().min(1).max(10).required();
// 密码的验证规则
const password = Joi.string().pattern(/^[\w]{6,12}$/).required();
// 学号
const xuehao = Joi.number().integer().min(1);
// 昵称
const nickname = Joi.string().min(1).max(15);
// 真实姓名
const realname = Joi.string().min(1).max(15);
// 电话号码
const phonenumber = Joi.string().max(11);
// email
const email = Joi.string().email();

const avatar = Joi.string().regex(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/);



// 导出登录和注册时候的路由验证规则
export const reg_login_scheme = {
  body: {
    username,
    password
  }
};
// 导出更新用户数据的路由验证规则
export const update_userinfo_scheme = {
  body: {
    xuehao,
    nickname,
    realname,
    phonenumber,
    email,
  }
};
// 导出重置密码验证规则
export const update_password_scheme = {
  body: {
    oldPwd: password,
    // .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(password)
  }
};
// 管理员重置密码规则
export const resetpwd_scheme = {
  body: {
    id,
  }
};
