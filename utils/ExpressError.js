// Custom error class that extends the native Error class
// Used to throw errors with status code and message in route handlers
class ExpressError extends Error {
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;