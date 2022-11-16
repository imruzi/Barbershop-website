const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const connectDB = async () => {

  try{
    mongoose.connect("mongodb://127.0.0.1:27017/final", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log('MongoDB database connection established successfully');
    });
  }
  catch(err){
    console.log(err)
  }
}

module.exports = connectDB