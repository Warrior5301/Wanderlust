const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");
//SignUp get and post routes
router.route("/signup")
.get(userController.renderSignupForm)
.post(
  wrapAsync(userController.signup),
);


//LogIn get and post routes
router.route("/login")
.get( userController.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

router.get("/logout", userController.logout);
router.get("/", (req,res)=>{
  res.redirect("/listings");
});
module.exports = router;
//MVC Framework