import express from 'express';
import { getNews } from '../router_handler/news.js';
import expressJoi from '@escook/express-joi';
import { getnews_scheme } from '../scheme/news.js';

const router = express.Router();

router.get('/news', expressJoi(getnews_scheme), getNews);

export default {
  router
};