import { db } from "../db/index.js";

// 获取新闻信息(根据id)
export async function getNews(req, res) {
  try {
    const [results] = await db.query('select * from news where id=?', req.query.id);
    if (results.length === 0) return res.cc('获取新闻信息失败!');
    res.send({
      status: 0,
      message: '获取新闻信息成功！',
      data: results
    });
  } catch (error) {
    return res.cc(error);
  }
}
// 添加新闻
export async function addNews(req, res) {
  const info = req.body;
  const file = req.files;
  try {
    // 判断新闻类型是否存在
    const [results1] = await db.query('select * from newstype where typename=?', req.body.typename);
    if (results1.length === 0) return res.cc('新闻类型不存在！');
    // 添加新闻
    const [results2] = await db.query('insert into news set title=?,typename=?,content=?,image=?,video=?,file=?',
      [info.title, info.typename, info.content, file.image ? file.image[0].path : null, file.video ? file.video[0].path : null, file.file ? file.file[0].path : null]);
    if (results2.affectedRows !== 1) return res.cc('添加新闻失败！');
    res.cc('添加新闻成功！', 0);
  } catch (error) {
    return res.cc(error);
  }
}
// 删除新闻
export async function deleteNews(req, res) {
  try {
    const [results1] = await db.query('select * from news where id=?', req.body.id);
    if (results1.length === 0) return res.cc('新闻不存在!');
    const [results] = await db.query('delete from news where id=?', req.body.id);
    if (results.affectedRows === 0) return res.cc('删除新闻信息失败!');
    res.send({
      status: 0,
      message: '删除新闻信息成功！'
    });
  } catch (error) {
    return res.cc(error);
  }
}
// 修改新闻
export async function updateNews(req, res) {
  const info = req.body;
  const file = req.files;
  console.log(info);
  try {
    // 判断新闻是否存在
    const [results] = await db.query('select * from news where id=?', info.id);
    if (results.length === 0) return res.cc('新闻不存在！');
    // 判断新闻类型是否存在
    const [results1] = await db.query('select * from newstype where typename=?', req.body.typename);
    if (results1.length === 0) return res.cc('新闻类型不存在！');
    // 修改新闻
    const [results2] = await db.query('update news set title=?,typename=?,content=?,image=?,video=?,file=? where id=?',
      [info.title, info.typename, info.content, file.image ? file.image[0].path : null, file.video ? file.video[0].path : null, file.file ? file.file[0].path : null, info.id]);
    if (results2.affectedRows !== 1) return res.cc('修改新闻失败！');
    res.cc('修改新闻成功！', 0);
  } catch (error) {
    return res.cc(error);
  }
}
// 获取新闻信息列表
export async function getNewsList(req, res) {
  try {
    const [results] = await db.query('select * from news');
    if (results.length === 0) return res.cc('获取新闻信息失败!');
    res.send({
      status: 0,
      message: '获取新闻信息成功！',
      data: results
    });
  } catch (error) {
    return res.cc(error);
  }
}