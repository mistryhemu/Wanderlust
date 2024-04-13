const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index))// Index Route
    .post(isLoggedIn, upload.single('listing[image]'),  validateListing, wrapAsync(listingController.createListing)); //Create Route


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync (listingController.showListing)) //show route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync (listingController.updateListing)) //update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));   //delete route


// Edit Route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Index Route

// app.get("/listings", async (req, res) => {
//     try {
//         const allListings = await Listing.find({});
//         console.log("All listings:", allListings); // Log the fetched listings
//         res.render("listings/index.ejs", { allListings });
//     } catch (err) {
//         console.error("Error fetching listings:", err);
//         res.status(500).send("Internal Server Error");
//     }
// });


// Show Route

// app.get("/listings/:id", async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/show.ejs", { imageUrl: listing.image.url });
// });



//Create Route
// router.post("/", validateListing, wrapAsync(async (req, res, next) => {
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
// }));





// Update Route
// app.put("/listings/:id", async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, {...req.body.listing });
//     res.redirect(`/listings/${id}`);
// });

 





module.exports = router;