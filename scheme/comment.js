import Joi from 'joi';

const id = Joi.number().integer().min(1).required();
const newsid = Joi.number().integer().min(1).required();
const userid = Joi.number().integer().min(1).required();
const content = Joi.string().min(1).required();

export const getcmtbynews_scheme = { body: { newsid } };
export const addcmt_scheme = { body: { newsid, content } };
export const delcmt_scheme = { body: { id } };
export const updcmt_scheme = { body: { id, content } };