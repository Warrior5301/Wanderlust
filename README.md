# Wanderlust - Airbnb Clone

A full-stack web application built with Node.js and Express.js where users can list their properties, browse listings from other users, leave reviews, and interact with the community. The application features complete authentication, authorization, and validation.

---

## 🌟 Features

### ✅ Core Features Implemented

- **User Authentication & Authorization**
  - User registration and login system
  - Passport.js authentication with Local Strategy
  - Password hashing with bcrypt (via passport-local-mongoose)
  - Session management with MongoDB session store
  - Automatic redirect to original URL after login

- **Listing Management**
  - Create, read, update, and delete (CRUD) listings
  - List properties with title, description, price, location, and country
  - Image upload to Cloudinary cloud storage
  - Category-based listings (mountains, arctic, farms, deserts)
  - Owner-based access control for editing/deleting

- **Review System**
  - Users can leave reviews with ratings (1-5 stars) on listings
  - Review comments and timestamps
  - Only review authors can delete their reviews
  - Automatic review deletion when listing is deleted

- **Security & Validation**
  - Joi schema validation for listings and reviews
  - Authorization middleware to verify user ownership
  - Flash messages for user feedback
  - Error handling and custom error pages

- **User Experience**
  - Responsive EJS templating with Bootstrap styling
  - Session-based messages (success/error alerts)
  - Listing filtering and display
  - User profile awareness (current logged-in user info)

---

## 🛠️ Technologies & Modules Used

### **Backend Framework & Runtime**
- **Node.js** `v22.19.0` - JavaScript runtime
- **Express.js** `^5.2.1` - Web application framework

### **Database & ODM**
- **MongoDB** - NoSQL database (via MongoDB Atlas)
- **Mongoose** `^9.2.0` - MongoDB object document mapper for schema definition and validation

### **Authentication & Security**
- **Passport.js** `^0.7.0` - Authentication middleware
- **passport-local** `^1.0.0` - Local strategy for username/password authentication
- **passport-local-mongoose** `^9.0.1` - Mongoose plugin for Passport authentication
- **express-session** `^1.19.0` - Session management middleware
- **connect-mongo** `^6.0.0` - MongoDB session store for Express
- **connect-flash** `^0.1.1` - Flash messages for user notifications

### **File Upload & Cloud Storage**
- **Multer** `^2.1.1` - Middleware for file upload handling
- **multer-storage-cloudinary** `^4.0.0` - Cloudinary storage engine for Multer
- **Cloudinary** `^1.41.3` - Cloud image storage and CDN service

### **Data Validation**
- **Joi** `^18.0.2` - Schema validation library for data validation

### **Templating & View Engine**
- **EJS** `^4.0.1` - Embedded JavaScript templating engine
- **ejs-mate** `^4.0.0` - Express.js layout support for EJS

### **Utilities & Middleware**
- **method-override** `^3.0.0` - Middleware to support PUT/DELETE HTTP methods via forms
- **cookieparser** `^0.1.0` - Cookie parsing middleware
- **dotenv** `^17.3.1` - Environment variable management

---

## ❌ Frameworks NOT Used

- **React.js** - No frontend JavaScript framework used
- **Next.js** - No meta-framework for React
- **Vue.js** - No progressive JavaScript framework
- **Angular.js** - No front-end MVC framework
- **Bootstrap.js** - No JavaScript components (CSS only for styling)

The frontend is built with plain HTML, CSS, and EJS templating without any JavaScript frameworks.

---

## 📁 Project Structure

```
MAJOR-PROJECT/
├── app.js                          # Main Express application & server setup
├── schema.js                       # Joi validation schemas for listings & reviews
├── middleware.js                   # Custom middleware (auth, validation, authorization)
├── cloudConfig.js                  # Cloudinary configuration for image uploads
├── package.json                    # Project dependencies
│
├── models/                         # Mongoose schemas & models
│   ├── listing.js                 # Listing schema (properties/accommodations)
│   ├── review.js                  # Review schema (ratings & comments)
│   └── user.js                    # User schema with Passport authentication
│
├── controllers/                    # Business logic for routes
│   ├── listings.js                # Listing CRUD operations
│   ├── reviews.js                 # Review creation & deletion
│   └── users.js                   # User signup, login, logout
│
├── routes/                         # Express route definitions
│   ├── listing.js                 # Listing routes with middleware
│   ├── review.js                  # Review routes with middleware
│   └── user.js                    # Authentication routes
│
├── utils/                          # Utility functions
│   ├── ExpressError.js            # Custom error class
│   └── wrapAsync.js               # Async error wrapper for routes
│
├── views/                          # EJS templates
│   ├── layouts/
│   │   └── boilerplate.ejs        # Main layout template
│   ├── includes/
│   │   ├── navbar.ejs             # Navigation bar
│   │   ├── footer.ejs             # Footer component
│   │   └── flash.ejs              # Flash message display
│   ├── listings/
│   │   ├── index.ejs              # Listings list view
│   │   ├── show.ejs               # Listing detail view
│   │   ├── new.ejs                # Create listing form
│   │   ├── edit.ejs               # Edit listing form
│   │   └── error.ejs              # Error page
│   └── users/
│       ├── login.ejs              # Login form
│       └── signup.ejs             # Signup form
│
├── public/                         # Static assets
│   ├── css/
│   │   ├── style.css              # Main styles
│   │   └── rating.css             # Star rating styles
│   ├── js/
│   │   └── script.js              # Client-side JavaScript
│   └── assets/                    # Images and icons
│
└── init/                           # Database initialization scripts
    ├── index.js                   # Initialize database with sample data
    └── data.js                    # Sample listing data
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.19.0 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MAJOR-PROJECT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   NODE_ENV=development
   ATLASDB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/wanderlust
   SECRET=your_session_secret_key
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the application**
   ```bash
   node app.js
   ```
   
   The server will run on `http://localhost:8080`

### Initialize Database with Sample Data

```bash
node init/index.js
```

---

## 📋 API Routes

### **Listing Routes** (`/listings`)

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| GET | `/listings` | Get all listings | No |
| POST | `/listings` | Create new listing | Yes |
| GET | `/listings/new` | Show create form | Yes |
| GET | `/listings/:id` | Get listing details | No |
| PUT | `/listings/:id` | Update listing | Yes (Owner) |
| DELETE | `/listings/:id` | Delete listing | Yes (Owner) |
| GET | `/listings/:id/edit` | Show edit form | Yes (Owner) |

### **Review Routes** (`/listings/:id/reviews`)

| Method | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/listings/:id/reviews` | Create review | Yes |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review | Yes (Author) |

### **User Routes**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/signup` | Show signup form |
| POST | `/signup` | Register new user |
| GET | `/login` | Show login form |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Logout user |

---

## 🔐 Authentication & Authorization

### Authentication
- Uses **Passport.js** with Local Strategy
- Passwords are hashed using bcrypt (via passport-local-mongoose)
- Sessions stored in MongoDB with 7-day expiration
- Automatic redirect query string for post-login redirect

### Authorization
- `isLoggedIn` - Verifies user is authenticated
- `isOwner` - Verifies user owns the listing being edited/deleted
- `isReviewAuthor` - Verifies user authored the review being deleted

### Session Management
- **Store**: MongoDB (via connect-mongo)
- **Duration**: 7 days
- **Cookie Type**: httpOnly (secure, not accessible via JavaScript)

---

## ✔️ Data Validation

### Listing Validation (Joi)
- Title: Required string
- Description: Required string
- Location: Required string
- Country: Required string
- Price: Required number, minimum 0
- Image: Optional string

### Review Validation (Joi)
- Rating: Required number (1-5)
- Comment: Required string

---

## 🎨 Frontend Technologies

- **HTML5** - Semantic markup
- **CSS3** - Styling and responsive design
- **EJS** - Server-side templating
- **Bootstrap** - CSS framework (optional styling utility)
- **JavaScript (Vanilla)** - Client-side interactivity

---

## 📝 Key Features Implementation

### Session & Flash Messages
The application uses `connect-flash` for flash messages that display success/error notifications to users after operations like creating, updating, or deleting listings.

### Image Upload
Images are uploaded directly to Cloudinary using `multer-storage-cloudinary`, providing:
- Secure cloud storage
- Automatic image optimization
- CDN delivery for fast loading

### Error Handling
- Custom `ExpressError` class for consistent error structure
- Async error wrapper (`wrapAsync`) for route handlers
- Centralized error page for user-friendly messages

### Security Features
- Passport authentication with hashed passwords
- Authorization middleware protecting routes
- Session validation for sensitive operations
- Input validation with Joi schemas
- httpOnly cookies for session security

---

## 📦 Dependencies Summary

**Total Installed Packages**: 16

| Package | Version | Purpose |
|---------|---------|---------|
| express | 5.2.1 | Web framework |
| mongoose | 9.2.0 | Database ODM |
| passport | 0.7.0 | Authentication |
| ejs | 4.0.1 | View engine |
| joi | 18.0.2 | Data validation |
| cloudinary | 1.41.3 | Cloud storage |
| express-session | 1.19.0 | Session management |
| connect-mongo | 6.0.0 | MongoDB sessions |
| multer | 2.1.1 | File uploads |
| connect-flash | 0.1.1 | Flash messages |
| method-override | 3.0.0 | HTTP method override |
| dotenv | 17.3.1 | Environment variables |
| ejs-mate | 4.0.0 | EJS layouts |
| passport-local | 1.0.0 | Local authentication |
| passport-local-mongoose | 9.0.1 | Passport Mongoose integration |
| multer-storage-cloudinary | 4.0.0 | Cloudinary storage |

---

## 🔧 Configuration Files

### `.env` (not included - create locally)
Environment variables for sensitive data

### `cloudConfig.js`
Cloudinary configuration and multer storage setup

### `middleware.js`
Custom middleware for:
- Authentication checks
- Authorization verification
- Request validation
- Error handling

---

## 🐛 Error Handling

The application implements comprehensive error handling:

1. **Async Error Wrapper** - Catches errors in async route handlers
2. **Validation Errors** - Joi schema validation with detailed error messages
3. **Authorization Errors** - Prevents unauthorized access with flash messages
4. **Custom Error Page** - Beautiful error display with status codes
5. **Session Errors** - Handles MongoDB connection issues gracefully

---

## 📚 Learning Outcomes

This project demonstrates:

✅ Full-stack development with Node.js & Express.js  
✅ MongoDB and Mongoose for database operations  
✅ Authentication & Authorization patterns  
✅ Session management and security best practices  
✅ MVC (Model-View-Controller) architecture  
✅ RESTful API design  
✅ Form validation and error handling  
✅ Cloud storage integration (Cloudinary)  
✅ EJS templating and view management  
✅ Middleware and route organization  

---

## 📄 License

ISC License

---

## 👨‍💻 Author

Built as a comprehensive full-stack project to demonstrate real-world development practices.

---

## 🤝 Contributing

This is an educational project. Feel free to fork and learn from it!

---

## 📞 Support

For questions or issues, refer to the inline code comments and project structure documentation above.

---

**Happy Coding! 🚀**
