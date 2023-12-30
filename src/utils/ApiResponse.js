/**
 * Class representing an API response with standardized format.
 */

class ApiResponse {
    /**
     * Create a new ApiResponse instance.
     *
     * @param {number} statusCode - The HTTP status code of the response.
     * @param {any} data - The data payload of the response.
     * @param {string} message - A message describing the response (default is "Success").
     */
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export {ApiResponse};