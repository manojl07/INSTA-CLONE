require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 5000;
const connectDB = require('./src/config/db')

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, (req, res) => {
      console.log(`🚀 Server running on port ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
}

startServer();