const imagekit = require("../config/imageKit");

const uploadImage = async (file, folder = '/insta-clone') => {
  if(!file){
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

module.exports = { uploadImage };