const User = require("../models/user");

// Render signup form page
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Handle user registration and signup
module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      // Use Passport plugin method to register user with hashed password
      const registeredUser = await User.register(newUser, password);
      // Automatically log in the newly registered user
      req.login(registeredUser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
      })
    } catch (e) {
      // Handle registration errors (e.g., duplicate username)
      req.flash("error", e.message);
      res.redirect("/signup");
    }
};

// Render login form page
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Handle user login (Passport authentication is done in routes)
module.exports.login = async (req, res) => {
    req.flash("success","Welcome back to Wanderlust!");
    // Redirect to original requested page or default to listings
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// Handle user logout
module.exports.logout = (req, res, next)=>{
  // Destroy session and clear authentication
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};  