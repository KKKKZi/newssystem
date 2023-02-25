import { db } from "../db/index.js";

// 获取轮播图列表
export async function getSwiper(req, res) {
  try {
    const [results] = await db.query('select * from swiper');
    if (results.length === 0) return res.cc('获取轮播图列表失败或轮播图表为空！');
    res.send({
      status: 0,
      message: '获取轮播图列表成功',
      data: results
    });
  } catch (error) {
    return res.cc(error);
  }
}
// 添加轮播图
export async function addSwiper(req, res) {
  try {
    // 是否上传swiper属性或者上传的swiper为空
    if (!req.files || !req.files.swiper) { throw new Error('轮播图不能为空！'); }
    // console.log(req.files);
    const [results] = await db.query('insert into swiper set swiper=?', req.files.swiper[0].path);
    if (results.affectedRows === 0) return res.cc('添加轮播图失败!');
    res.send({
      status: 0,
      message: '添加轮播图成功！'
    });
  } catch (error) {
    return res.cc(error);
  }
}
// 删除轮播图
export async function deleteSwiper(req, res) {
  try {
    // 判断轮播图id是否存在
    const [results1] = await db.query('select * from swiper where id=?', req.body.id);
    const [results] = await db.query('delete from swiper where id=?', req.body.id);
    if (results.affectedRows === 0) return res.cc('删除轮播图失败!');
    res.send({
      status: 0,
      message: '删除轮播图成功！'
    });
  } catch (error) {
    return res.cc(error);
  }
}
// 修改轮播图
export async function updateSwiper(req, res) {
  try {
    // 是否上传swiper属性或者上传的swiper为空
    if (!req.files || !req.files.swiper) { throw new Error('轮播图不能为空！'); }
    const [results] = await db.query('update swiper set swiper=? where id=?', [req.files.swiper[0].path, req.body.id]);
    if (results.affectedRows === 0) return res.cc('修改轮播图失败!');
    res.send({
      status: 0,
      message: '修改轮播图成功！'
    });
  } catch (error) {
    return res.cc(error);
  }
}