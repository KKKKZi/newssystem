import { db } from "../db/index.js";

// 管理员获取所有评论列表
export async function getcmtList(req, res) {
  try {
    const [results] = await db.query('select * from comment');
    if (results.length === 0) { return res.cc('获取评论失败或评论表为空！'); }
    res.send({
      status: 0,
      message: '获取评论列表成功！',
      data: results
    });
  } catch (error) {
    return res.cc(error);
  }
}
// 通过新闻id获取评论列表
export async function getcmtByNews(req, res) {
  try {
    // 查询新闻id是否存在
    const [results1] = await db.query('select * from news where id=?', req.body.newsid);
    if (results1.length === 0) return res.cc('新闻id不存在!');
    const [results] = await db.query('select * from comment where newsid=?', req.body.newsid);
    if (results.length === 0) { return res.cc('获取评论失败或该新闻评论为空！'); }
    res.send({
      status: 0,
      message: '获取评论列表成功！',
      data: results
    });
  } catch (error) {
    return res.cc(error);
  }
}
// 用户添加评论
export async function addCmt(req, res) {
  try {
    console.log(req.auth);
    const info = req.body;
    // 查询新闻id是否存在
    const [results1] = await db.query('select * from news where id=?', info.newsid);
    if (results1.length === 0) return res.cc('新闻id不存在!');
    // 执行新闻评论插入语句
    const [results] = await db.query('insert into comment set newsid=?,userid=?,content=?',
      [info.newsid, req.auth.id, info.content]);
    if (results.affectedRows !== 1) return res.cc('添加评论失败!');
    res.cc('添加评论成功！', 0);
  } catch (error) {
    return res.cc(error);
  }
}
// 删除评论
export async function deleteCmt(req, res) {
  try {
    // 判断该评论id是否存在
    const [results2] = await db.query('select * from comment where id=?', req.body.id);
    if (results2.length === 0) return res.cc('评论不存在!');
    // 通过用户权限判断，如果权限不为2，则需要验证评论是否为自己发布的，否则不需要
    if (req.auth.perm !== 2) {
      const [results] = await db.query('select * from comment where id=? and userid=?',
        [req.body.id, req.auth.id]);
      if (results.length === 0) return res.cc('您只能删除自己的评论！');
    }
    // 执行删除评论操作
    const [results1] = await db.query('delete from comment where id=?', req.body.id);
    if (results1.affectedRows === 0) return res.cc('删除评论失败！');
    res.cc('删除评论成功！', 0);
  } catch (error) {
    res.cc(error);
  }
}
// 修改评论
export async function updCmt(req, res) {
  try {
    // 判断该评论id是否存在
    const [results2] = await db.query('select * from comment where id=?', req.body.id);
    if (results2.length === 0) return res.cc('评论不存在!');
    // 验证评论是否为自己发布的
    const [results] = await db.query('select * from comment where id=? and userid=?',
      [req.body.id, req.auth.id]);
    if (results.length === 0) return res.cc('您只能修改自己的评论！');
    // 执行修改评论操作
    const [results1] = await db.query('update comment set content=?  where id=?', [req.body.content, req.body.id]);
    if (results1.affectedRows === 0) return res.cc('修改评论失败！');
    res.cc('修改评论成功！', 0);
  } catch (error) {
    res.cc(error);
  }
}