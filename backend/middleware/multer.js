import multer from 'multer';

const upload = multer();
const uploadImage = upload.array('images', 4);
export default uploadImage;
