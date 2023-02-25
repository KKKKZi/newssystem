// 管理员路由权限控制
export function adminPerm(req, res, next) {
  // console.log(req.auth.perm);
  if (req.auth.perm === 0) { throw new Error('权限不足！'); }
  next();
};