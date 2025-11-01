import { v2 as cloudinary } from 'cloudinary';

const uploadToCloudinary = async ({ files, folder, type }) => {
  const uploadResults = await Promise.all(
    files.map(async (file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: type,
              folder: folder,
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            },
          )
          .end(file.buffer);
      });
    }),
  );

  const urls = uploadResults.map((result) => result.secure_url);

  return { urls, uploadResults };
};

export default uploadToCloudinary;
