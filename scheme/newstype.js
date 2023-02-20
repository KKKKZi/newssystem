import joi from 'joi';// 导入  定义表单规则  的模块
/**
* string() 值必须是字符串
* alphanum() 值只能是包含 a-zA-Z0-9 的字符串
* min(length) 最小长度
* max(length) 最大长度
* required() 值是必填项，不能为 undefined
* pattern(正则表达式) 值必须符合正则表达式的规则
*/
// id的验证规则
const id = joi.number().integer().min(1).required();

// 新闻类型的验证规则
const typename = joi.string().min(1).max(10).required();

// 导出增加删除新闻类型验证规则
export const newstype_scheme = {
  body: {
    typename
  }
};
// 导出修改新闻类型验证规则
export const update_newstype_scheme = {
  body: {
    oldtypename: typename,
    newtypename: joi.not(joi.ref('oldtypename')).concat(typename)
  }
};