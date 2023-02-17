import joi from 'joi';// 导入  定义表单规则  的模块
/**
* string() 值必须是字符串
* alphanum() 值只能是包含 a-zA-Z0-9 的字符串
* min(length) 最小长度
* max(length) 最大长度
* required() 值是必填项，不能为 undefined
* pattern(正则表达式) 值必须符合正则表达式的规则
*/

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required();
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required();
// 学号
const xuehao = joi.number.integer().positive().min(6).max(10);
// 昵称
const nickname = joi.string().min(1).max(15);
// 真实姓名
const realname = joi.string().min(1).max(15);
// 电话号码
const phonenumber = joi.string().max(11);
// email
const email = joi.string().max(45);

export const reg_login_scheme = {
  body: {
    username,
    password
  }
};