const Listing = require("../models/listing");

// Get all listings and render the listings index page
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// Render the new listing form page
module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new.ejs");
}

// Get single listing by ID with populated reviews and owner info
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing does not Exist!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}

// Create a new listing with image and owner information
module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    // Set the current user as the listing owner
    newListing.owner = req.user._id;
    // Store image information from Cloudinary upload
    newListing.image = {filename, url};
    await newListing.save();
    req.flash("success", "New Listing Created!");

    res.redirect("/listings");
}

// Render the edit listing form with original image dimensions
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing does not Exist!");
      res.redirect("/listings");
    }
    // Optimize image size for display in edit form
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

// Update listing with new information and image if provided
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    // Update image only if a new file was uploaded
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {filename, url};
        await listing.save();
    };
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

// Delete a listing by ID
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}