const express = require('express');
const router = express.Router();

const validate = require('../middlewares/validate.middleware');
const upload = require('../middlewares/upload.middleware');
const authMiddleware = require('../middlewares/auth.middleware')

const {
  registerSchema,
  loginSchema,
  refreshSchema,
  logoutSchema,
} = require('../validators/auth.validator');

const {
  registerController,
  loginController,
  getMeController,
  refreshController,
  logoutController,
  logoutAllController
} = require('../controllers/auth.controller');

router.post(
  "/register",
  upload.single("profileImage"),
  validate(registerSchema),
  registerController
);

router.post(
  "/login",
  validate(loginSchema),
  loginController
);

router.get('/me', authMiddleware, getMeController)

router.post(
  "/refresh",
  refreshController
);

router.post(
  "/logout",
  validate(logoutSchema),
  logoutController
);

router.post(
  "/logout-all",
  authMiddleware,
  logoutAllController
);

module.exports = router;