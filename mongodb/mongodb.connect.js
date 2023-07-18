const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });
    console.log('Connected to MongoDB:', `${process.env.DB_HOST}`);
  } catch (error) {
    console.error(error, '::Error connection to mongodb');
  }
}
module.exports = { connect };
