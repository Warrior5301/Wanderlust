// Wrapper function for async route handlers that catches errors
// and passes them to the next error handling middleware
module.exports = (fn)=>{
    return (req, res, next)=>{
        fn(req, res, next).catch(next);
    };
};