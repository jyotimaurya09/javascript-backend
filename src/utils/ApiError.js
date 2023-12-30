/**
 * Class representing an API error with standardized format.
 * Extends the built-in Error class.
 */

class ApiError extends Error {
    /**
     * Create a new ApiError instance.
     *
     * @param {number} statusCode - The HTTP status code of the error.
     * @param {string} message - A message describing the error (default is "Something went wrong").
     * @param {Array} errors - An array of error details or validation errors (default is an empty array).
     * @param {string} stack - The stack trace of the error (default is empty string).
     */
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode,
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        // Set the stack trace of the error, either from the provided stack or capture it
        if(stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};