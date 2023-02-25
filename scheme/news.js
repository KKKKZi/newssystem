import Joi from "joi";

const id = Joi.number().integer().min(1).required();

const title = Joi.string().min(1).max(255).required();

// 新闻类型的验证规则
const typename = Joi.string().min(1).max(10).required();

const content = Joi.string().required().allow('');

// 获取新闻
export const getnews_scheme = {
  query: {
    id,
  }
};
// 删除新闻
export const deletenews_scheme = {
  body: {
    id,
  }
};
// 添加新闻
export const addnews_scheme = {
  body: {
    title,
    typename,
    content,
  }
};
// 修改新闻
export const updatenews_scheme = {
  body: {
    id,
    title,
    typename,
    content,
  }
};
