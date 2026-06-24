const imagekit = require("../config/imageKit");


console.log("Uploading...");
console.log(process.env.IMAGEKIT_PRIVATE_KEY);
const uploadImage = async (file, folder = '/insta-clone') => {
  if (!file) {
    return null;
  }

  const response = await imagekit.upload({
    file: file.buffer,
    fileName: `${Date.now()}-${file.originalname}`,
    folder,
  })
  return {
    imageUrl: response.url,
    imageFileId: response.fileId,
  }
}

const deleteImage = async (fileId) => {
  await imagekit.deleteFile(fileId);

  return true;
}

module.exports = { uploadImage, deleteImage };