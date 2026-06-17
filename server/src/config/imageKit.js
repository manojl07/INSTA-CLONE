const ImageKit = require('imagekit');

console.log("PUBLIC:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log(
  "PRIVATE PREFIX:",
  process.env.IMAGEKIT_PRIVATE_KEY?.substring(0, 12)
);
console.log("URL:", process.env.IMAGEKIT_URL_ENDPOINT);

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

console.log(imagekit.getAuthenticationParameters());

module.exports = imagekit;

