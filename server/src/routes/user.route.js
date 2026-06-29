const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");

const {
  getUserProfileController,
  toggleFollowController,
  searchUserController,
  getFollowersController,
  getFollowingController,
} = require("../controllers/user.controller");

router.get(
  "/search",
  authMiddleware,
  searchUserController
);

router.get(
  "/:userId/followers",
  authMiddleware,
  getFollowersController
);

router.get(
  "/:userId/following",
  authMiddleware,
  getFollowingController
);

router.get(
  "/:userId",
  authMiddleware,
  getUserProfileController
);

router.patch(
  "/:userId/follow",
  authMiddleware,
  toggleFollowController
);

module.exports = router;