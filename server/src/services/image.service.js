const imagekit = require("../config/imageKit");

const uploadImage = async (file) => {
  if (!file) return null;

  try {
    const response = await imagekit.upload({
      file: file.buffer.toString("base64"),
      fileName: `${Date.now()}-${file.originalname}`,
      useUniqueFileName: true,
      folder: "/insta-clone/profile-image",
    });

    return response.url;
  } catch (error) {
    console.dir(error, { depth: null });
    throw error;
  }
};

module.exports = { uploadImage };