const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({success: true, message: "Instagram Clone API Running"})
})

module.exports = app;