import multer from 'multer';
import { getTimeNow } from '../utils/getTimeNow';

const MIME_TYPES: { [key: string]: string } = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + getTimeNow() + '.' + extension);
  },
});

export const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
}).single('file');
