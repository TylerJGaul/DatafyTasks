const mongoose = require('mongoose');
const requiredString = {
	type: String,
	require: true
}
const noteSchema = mongoose.Schema({
	
    title: requiredString,
	content: requiredString
});



module.exports = mongoose.model("notes", noteSchema);