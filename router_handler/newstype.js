import { db } from '../db/index.js';

// 获取新闻类型
export async function getNewsType(req, res) {
  const sql = 'select * from newstype';
  try {
    const [results] = await db.query(sql);
    res.send({
      status: 0,
      message: '请求新闻类型成功',
      data: results
    });
  } catch (err) {
    res.cc(err);
  }
};

// 删除新闻类型
export async function deleteNewsType(req, res) {
  try {
    // 判断删除的新闻类型是否存在
    const [results1] = await db.query('select * from newstype where typename = ?', req.body.typename);
    if (results1.length === 0) return res.cc('新闻类型不存在！删除失败！');
    // 执行语句并判断执行是否成功
    const [results] = await db.query('delete from newstype where typename =?', req.body.typename);
    if (results.affectedRows !== 1) return res.cc('删除新闻类型失败！');
    res.cc('删除新闻类型成功！', 0);
  }
  catch (err) { res.cc(err); }
}

// 修改新闻类型
export async function updateNewsType(req, res) {
  try {
    // 判断新闻类型是否存在
    const [results1] = await db.query('select * from newstype where typename = ?', req.body.oldtypename);
    if (results1.length === 0) return res.cc('源新闻类型不存在！修改失败！');
    // 执行语句并判断执行是否成功
    const [results] = await db.query('update newstype set typename=? where typename=?', [req.body.newtypename, req.body.oldtypename]);
    if (results.affectedRows !== 1) return res.cc('修改新闻类型失败！');
    res.cc('修改新闻类型成功！', 0);
  } catch (err) {
    res.cc(err);
  }
}

// 增加新闻类型
export async function addNewsType(req, res) {
  try {
    // 判断增加的新闻类型是否存在
    const [results1] = await db.query('select * from newstype where typename = ?', req.body.typename);
    if (results1.length !== 0) return res.cc('新闻类型已经存在！添加失败！');
    // 增加新闻类型语句并判断执行是否成功
    const [results] = await db.query('insert into newstype set typename = ?', req.body.typename);
    if (results.affectedRows !== 1) return res.cc('增加新闻类型失败！');
    res.cc('增加新闻类型成功！', 0);
  } catch (err) {
    res.cc(err);
  }
};
