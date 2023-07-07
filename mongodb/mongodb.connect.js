const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://bhattaraiprabesh:gtuAgvsPg2KHlBUC@cluster0.bwmfvsr.mongodb.net/',
      { useNewUrlParser: true }
    );
  } catch (error) {
    console.error(error, '::Error connection to mongodb');
  }
}
module.exports = { connect };
