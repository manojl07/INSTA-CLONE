const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const {
  getUserProfileController,
  toggleFollowController,
  searchUserController,
} = require("../controllers/user.controller");

/*
IMPORTANT

Keep /search BEFORE /:userId
otherwise Express thinks

/search

is a userId.
*/

router.get('/search', authMiddleware, searchUserController);

router.get(
  "/:userId",
  authMiddleware,
  getUserProfileController
);

router.patch('/:userId/follow', authMiddleware, toggleFollowController);

module.exports = router;