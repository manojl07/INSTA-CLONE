const crypto = require("crypto");
const ApiResponse = require('../utils/ApiResponse')
const authService = require('../services/auth.service')
const asyncHandler = require('../utils/asyncHandler')
const { accessCookieOptions, refreshCookieOptions } = require("../config/cookie.config");


const registerController = asyncHandler(async (req, res) => {
  const result = await authService.register({
    ...req.body,
    deviceId: crypto.randomUUID(),
    profileImage: req.file,
    userAgent: req.get("user-agent"),
    ipAddress: req.ip
  })

  res.cookie(
    "accessToken",
    result.accessToken,
    accessCookieOptions
  );

  res.cookie(
    "refreshToken",
    result.refreshToken,
    refreshCookieOptions
  );

  res.cookie(
    "deviceId",
    result.deviceId,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      "User registered successfully",
      {
        user: result.user,
        sessionId: result.sessionId
      }
    )
  );
})

const loginController = asyncHandler(async (req, res) => {
  const result = await authService.login({
    identifier: req.body.identifier,
    password: req.body.password,
    deviceId: crypto.randomUUID(),
    userAgent: req.get("user-agent"),
    ipAddress: req.ip
  })

  res.cookie(
    "accessToken",
    result.accessToken,
    accessCookieOptions
  );

  res.cookie(
    "refreshToken",
    result.refreshToken,
    refreshCookieOptions
  );

  res.cookie(
    "deviceId",
    result.deviceId,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Login Successful",
      {
        user: result.user,
        sessionId: result.sessionId
      }
    )
  );
})

const getMeController = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);

  return res.status(200).json(new ApiResponse(200, "User fetched successfully", user))
})

const updateProfileController = asyncHandler(async (req, res) => {
  const updatedUser = await authService.updateProfile({
    userId: req.user.id,
    bio: req.body.bio,
    profileImage: req.file
  })
  
  return res.status(200).json(new ApiResponse(200, "Profile updated successfully", updatedUser))
})

const refreshController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const deviceId = req.cookies.deviceId;

  if (!refreshToken || !deviceId) {
    return res
      .status(401)
      .json(new ApiResponse(401, "Authentication required"));
  }

  const result = await authService.refresh({
    refreshToken,
    deviceId,
    userAgent: req.get("user-agent"),
    ipAddress: req.ip,
  });

  res.cookie("accessToken", result.accessToken, accessCookieOptions);
  res.cookie("refreshToken", result.refreshToken, refreshCookieOptions);

  return res.status(200).json(
    new ApiResponse(200, "Token refreshed", {
      ...result,
      deviceId,
    })
  );
});

const logoutController = asyncHandler(async (req, res) => {
  await authService.logout(
    req.cookies.refreshToken,
    req.cookies.deviceId
  );

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("deviceId");

  return res.status(200).json(
    new ApiResponse(200, "Logged out successfully")
  );
});

const logoutAllController = asyncHandler(async (req, res) => {
  await authService.logoutAll(req.user.id);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("deviceId");

  return res.status(200).json(
    new ApiResponse(200, "Logged out from all devices")
  );
});

module.exports = { registerController, loginController, getMeController, updateProfileController, refreshController, logoutController, logoutAllController }


