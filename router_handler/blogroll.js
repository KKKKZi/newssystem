import { db } from "../db/index.js";

// 获取友情链接表
export async function getBlogroll(req, res) {
  try {
    const [results] = await db.query('select * from blogroll');
    if (results.length === 0) return res.cc('获取友情链接失败或友情链接为空！');
    res.send({
      status: 0,
      message: '获取友情链接成功！',
      data: results
    });
  } catch (error) {
    return res.cc(error);
  }
}
// 添加友情链接
export async function addBlogroll(req, res) {
  try {
    const [results] = await db.query('insert into blogroll set name=?,url=?', [req.body.name, req.body.url]);
    if (results.affectedRows === 0) return res.cc('添加友情链接失败！');
    res.send({
      status: 0,
      message: '添加友情链接成功！'
    });
  } catch (error) {
    return res.cc(error);
  }
}
// 删除友情链接
export async function delBlogroll(req, res) {
  try {
    const [results] = await db.query('delete from blogroll where id=?', [req.body.id]);
    if (results.affectedRows === 0) return res.cc('删除友情链接失败！');
    res.send({
      status: 0,
      message: '删除友情链接成功！'
    });
  } catch (error) {
    return res.cc(error);
  }
}
// 修改友情链接
export async function updBlogroll(req, res) {
  try {
    // 判断友情链接id是否存在
    const [results1] = await db.query('select * from blogroll where id=?', req.body.id);
    if (results1.length === 0) return res.cc('友情链接id不存在!');
    const [results] = await db.query('update blogroll set name=?,url=? where id=?', [req.body.name, req.body.url, req.body.id]);
    if (results.affectedRows === 0) return res.cc('修改友情链接失败！');
    res.send({
      status: 0,
      message: '修改友情链接成功！'
    });
  } catch (error) {
    return res.cc(error);
  }
}