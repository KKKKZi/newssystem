import { log } from 'console';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.join(__filename, '../'));

// 设置磁盘存储引擎
const storage = multer.diskStorage({
  // 存储路径
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/public/uploads/', file.fieldname));
  },
  // 存储文件名
  filename: (req, file, cb) => {
    // 获取文件拓展名
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${new Date().getTime() + Math.random().toString().slice(2)}${extname}`);
  }
});

// 接受指定 fields 的混合文件。这些文件的信息保存在 req.files。
// fields 是一个对象数组，具有 name 和可选的 maxCount 属性。
const fieldList = [
  { name: 'swiper' },
  { name: 'avatar' },
  { name: 'video' },
  { name: 'file' },
  { name: 'image' }
];

// 文件过滤器
function fileFilter(req, file, cb) {
  // 通过调用cb,用boolean值来指示是否应接受该文件
  // 拒绝这个文件，使用`false`
  // cb(null, false);
  const extname = path.extname(file.originalname);
  // console.log('file.fieldname:', file.fieldname, 'extname:', extname);
  if (file.fieldname === 'avatar' && extname === ('.jpg' || '.png' || '.jpeg' || '.JPG' || '.JPEG' || '.PNG'))
  // 接受这个文件，使用`true`，像这样:
  { return cb(null, true); }
  else if (file.fieldname === 'swiper' && extname === ('.jpg' || '.png' || '.jpeg' || '.JPG' || '.JPEG' || '.PNG')) { return cb(null, true); }
  else if (file.fieldname === 'image' && extname === ('.jpg' || '.png' || '.jpeg' || '.JPG' || '.JPEG' || '.PNG')) { return cb(null, true); }
  else if (file.fieldname === 'video' && extname === ('.mp4' || '.avi' || '.mov')) { return cb(null, true); }
  else if (file.fieldname === 'file' && extname === ('.docx' || '.zip' || '.xlsx' || '.pptx' || '.rar' || '.pdf')) { return cb(null, true); }
  else
  // 如果有问题，你可以总是这样发送一个错误:
  { return cb(new Error('multer\'s fileFilter error')); }

}
export const upload = multer({ storage, fileFilter }).fields(fieldList);