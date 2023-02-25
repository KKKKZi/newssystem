import Joi from "joi";

const id = Joi.number().integer().min(1).required();
const name = Joi.string().min(1).required();
// website URI限制
const url = Joi.string().regex(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/).required();

export const addblogroll_scheme = { body: { name, url } };
export const delblogroll_scheme = { body: { id } };
export const updblogroll_scheme = { body: { id, name, url } };