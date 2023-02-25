import Joi from "joi";

const id = Joi.number().integer().min(1).required();
const swiper = Joi.string().required();
export const addswiper_scheme = {
  body: {
    swiper
  }
};
export const deleteswiper_scheme = {
  body: {
    id
  }
};
export const updateswiper_scheme = {
  body: {
    id
  }
};