const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

// Listing schema for properties/accommodations
const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://thumbs.dreamstime.com/z/autumn-nature-landscape-colorful-forest-autumn-nature-landscape-colorful-forest-morning-sunlight-131400332.jpg?ct=jpeg"
        }
    },
    price: Number,
    location: String,
    country: String,
    // Array of review references
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    // Reference to the listing owner (user who created it)
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    category:{
        type:String,
        enum:["moungatins", "arctic", "farms", "deserts"]
    }
});

// Middleware to delete all associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
 