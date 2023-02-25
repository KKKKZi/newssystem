import { db } from "../db/index.js";
import fs from 'fs';
import path from "path";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.join(__filename, '../'));

async function clearUploads(folder, col, table) {
  // console.log(__dirname);
  const fullpath = path.join(__dirname, '/public/uploads/', folder);// 需要清除的文件夹路径
  // 头像
  try {
    // 查询数据库
    const [results1] = await db.query(`select ${col} from ${table}`);
    let files = [];
    // 同步判断文件夹是否存在文件
    if (fs.existsSync(fullpath)) {
      // 读取文件夹里面的文件
      files = fs.readdirSync(fullpath);
      // 遍历文件夹里面的文件
      files.forEach((file, index) => {
        let flag = false;
        let curPath = path.join(fullpath, file);// 当前文件的路径
        // 遍历数据库存储的文件，将数据库存储文件和文件夹文件作对比
        for (let i = 0; i < results1.length; i++) {
          // console.log(results1[i][col], '--', curPath, '--', flag, '--', results1[i].col === curPath);
          if (results1[i][col] == curPath) { flag = true; return; }
        }
        if (!flag) { //删除文件
          fs.unlinkSync(curPath);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

clearUploads('image', 'image', 'news');// (磁盘文件夹名, 数据库列名, 数据库表名)
clearUploads('video', 'video', 'news');// (磁盘文件夹名, 数据库列名, 数据库表名)
clearUploads('file', 'file', 'news');// (磁盘文件夹名, 数据库列名, 数据库表名)
clearUploads('avatar', 'avatar', 'users');// (磁盘文件夹名, 数据库列名, 数据库表名)
clearUploads('swiper', 'swiper', 'swiper');// (磁盘文件夹名, 数据库列名, 数据库表名)