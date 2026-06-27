const { z } = require('zod')


const usernameRegex = /^[a-zA-Z0-9._]{3,30}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,64}$/;


const registerSchema = z.object({
  username: z.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(usernameRegex, {
      message:
        "Username can contain only letters, numbers, dots and underscores"
    }),

  email: z.string().email("Please enter a valid email"),

  password: z.string().regex(passwordRegex, {
    message:
      "Password must contain uppercase, lowercase, number and special character"
  }),

  bio: z.string().max(150).optional()
});

const loginSchema = z.object({
  identifier: z.string().trim().min(3),
  password: z.string().min(6)
})

const refreshSchema = z.object({
  refreshToken: z.string(),
  deviceId: z.string()
});

const updateProfileSchema = z.object({
  bio: z.string().trim().max(150, "Bio cannot exceed 150 characters").optional(),
})

module.exports = { registerSchema, loginSchema, refreshSchema, updateProfileSchema }