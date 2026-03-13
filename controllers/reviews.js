const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// Create a new review for a listing
module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    // Set the current user as the review author
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}

// Delete a review from a listing
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    // Remove review reference from the listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviewId } });
    // Delete the review document from database
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}