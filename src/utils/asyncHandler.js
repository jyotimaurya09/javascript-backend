//  src/utils/asyncHandler.js

/**
 * A utility function to handle asynchronous Express route handlers.
 *
 * @param {function} requestHandler - The asynchronous route handler function.
 * @returns {function} - A middleware function that wraps the route handler.
 */

// Utility function to handle asynchronous functions in Express route handlers
const asyncHandler = (requestHandler) => {
    // Returning a new function that wraps the original request handler
    return (req, res, next) => {
        // Wrapping the original request handler in a Promise
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err));
    }
};

/*
const asyncHandler = (fn) => async (err, req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
     res.status(err.code || 500).json({
        success: false,
        message: err.message
     });   
    }
};
*/
export  default asyncHandler;

