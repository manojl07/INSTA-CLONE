const imagekit = require("../config/imageKit");

const uploadImage = async (imageFile, folder = "/insta-clone") => {
  if (!imageFile) {
    return null;
  }

  const response = await imagekit.upload({
    file: imageFile.buffer,
    fileName: `${Date.now()}-${imageFile.originalname}`,
    folder,
  });

  return {
    imageUrl: response.url,
    imageFileId: response.fileId,
  };
};
const deleteImage = async (fileId) => {
  await imagekit.deleteFile(fileId);

  return true;
}

module.exports = { uploadImage, deleteImage };