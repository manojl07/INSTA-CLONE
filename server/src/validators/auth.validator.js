const {z} = require('zod')

const usernameRegex = /^[a-zA-Z0-9._]{3,30}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,64}$/;

const registerSchema = z.object({
  username: z.string().trim().min(3).max(30).regex(usernameRegex),
  email: z.string().email(),
  password: z.string().regex(passwordRegex),
  bio: z.string().max(150).optional(),
  
});

const loginSchema = z.object({
  identifier: z.string().trim().min(3),
  password: z.string().min(6)
})

const refreshSchema = z.object({
  refreshToken: z.string(),
  deviceId: z.string()
});

const logoutSchema = z.object({sessionId: z.string()})

module.exports = {registerSchema, loginSchema, refreshSchema, logoutSchema}