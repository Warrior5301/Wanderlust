const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Review schema for user reviews on listings
const reviewSchema = new Schema({
    comment: String,
    rating:{
        type: Number,
        min:1,
        max:5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // Reference to the user who wrote the review
    author:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
});

module.exports = mongoose.model("Review", reviewSchema);
