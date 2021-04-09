var mongoose =require("mongoose");

var packageSchema = new mongoose.Schema({
	name: String,
	image: String,
	Itternary: String,
	description: String,
	PTV: String,
	smdesc: String,
	agency: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	price: Number,
	noofpax: Number,
	reviews:  [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Review"
      }
   ]
});
module.exports = mongoose.model("Package", packageSchema);