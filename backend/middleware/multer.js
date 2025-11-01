import multer from 'multer';

// const storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage, pr });

// export default upload;

const upload = multer();
const uploadImage = upload.array('images', 4);
export default uploadImage;
