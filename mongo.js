const mongoose = require("mongoose");

const mongoPath = "mongodb://127.0.0.1:27017/notesDB?retryWrites=true&w=majority";

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose;
};
