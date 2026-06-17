const { uploadImage } = require("./image.service");

const crypto = require('crypto')
const User = require('../models/user.model')
const Session = require('../models/session.model')
const Post = require('../models/post.model')
const ApiError = require('../utils/ApiError')
const { createTokens } = require('./token.service')
const { verifyRefreshToken } = require('../utils/jwt')


const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex')
}

const findUser = async (identifier) => {
  const user = await User.findOne({
    $or:
      [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }]
  }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  return user;
}

const createSession = async ({ user, refreshToken, deviceId, userAgent, ipAddress, }) => {
  const tokenHash = hashToken(refreshToken);
  const session = await Session.create({
    user: user._id,
    tokenHash,
    deviceId,
    userAgent,
    ipAddress,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  })

  return session;
}

const sanitizeUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  bio: user.bio,
  profileImg: user.profileImg,
  followersCount: user.followers.length,
  followingCount: user.following.length,
  isVerified: user.isVerified,
  createdAt: user.createdAt
});

const register = async ({
  username,
  email,
  password,
  bio,
  profileImage,
  deviceId,
  userAgent,
  ipAddress
}) => {
  const existing = await User.findOne({
    $or: [
      { email }, { username }
    ]
  });


  if (existing) {
    throw new ApiError(409, "User already exists")
  }

  const imageUrl = profileImage
    ? await uploadImage(profileImage)
    : undefined;

  const userData = {
    username,
    email,
    password,
    bio,
  };

  if (imageUrl) {
    userData.profileImg = imageUrl;
  }

  const user = await User.create(userData);
  const { accessToken, refreshToken } = createTokens(user);

  const session = await createSession({ user, refreshToken, deviceId, userAgent, ipAddress });

  return {
    user: sanitizeUser(user),
    accessToken,
    refreshToken,
    sessionId: session._id,
    deviceId
  };
}

const login = async ({ identifier, password, deviceId, userAgent, ipAddress }) => {
  const user = await findUser(identifier)
  const matched = await user.comparePassword(password);

  if (!matched) {
    throw new ApiError(401, "Invalid credentials")
  }

  const { accessToken, refreshToken } = createTokens(user);

  const session = await createSession({ user, refreshToken, deviceId, userAgent, ipAddress })

  return { user: sanitizeUser(user), accessToken, refreshToken, sessionId: session._id, deviceId }
}

const getMe = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  const postsCount = await Post.countDocuments({user: userId})

  return {...sanitizeUser(user), postsCount};
}

const logout = async (sessionId) => {
  await Session.findByIdAndDelete(sessionId);

  return true;
}

const logoutAll = async (userId) => {
  await Session.deleteMany({ user: userId })

  return true;
}

const refresh = async ({ refreshToken, deviceId, userAgent, ipAddress }) => {

  // verify jwt
  const decoded = verifyRefreshToken(refreshToken);

  // hash token
  const tokenHash = hashToken(refreshToken)

  // find session
  const session = await Session.findOne({ tokenHash });

  if (!session) {
    throw new ApiError(401, "Invalid refresh token")
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(404, "User not found")
  }

  // generate new tokens
  const { accessToken, refreshToken: newRefreshToken } = createTokens(user)

  //delete old session
  await Session.findByIdAndDelete(session._id)

  //create new session
  const newSession = await createSession({
    user,
    refreshToken: newRefreshToken,
    deviceId,
    userAgent,
    ipAddress,
  })

  return { accessToken, refreshToken: newRefreshToken, sessionId: newSession._id }

}

module.exports = { register, login, getMe, refresh, logout, logoutAll }