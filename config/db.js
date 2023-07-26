const mongoose = require('mongoose');
const dotenv = require("dotenv");
// const config = require('config');
// const db = config.get('mongoURI');

// Connection to MongoDB
dotenv.config();
// const mongoURL = "mongodb://localhost:27017/table"
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_PRODUCT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
