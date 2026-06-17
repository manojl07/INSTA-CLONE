const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require("cookie-parser");



const authRouter = require('./src/routes/auth.route');
const postRouter = require('./src/routes/post.route')
const errorHandler = require('./src/middlewares/error.middleware')

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter)

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({success: true, message: "Instagram Clone API Running"})
})

module.exports = app;