const { ValidationError } = require("../errors/errors");

function errorHandler(error, req, res, next) {
    // In case of validation error, add global and field level errors
    if (error instanceof ValidationError) {
        return res.status(error.statusCode).json({
            error: {
                name: error.name,
                message: error.message,
                fieldErrors: error.fieldErrors.map((error) => ({
                    field: error.field,
                    message: error.message,
                })),
                globalErrors: error.globalErrors
            },
        });
    }

    // Handler all other errors.
    const errorName =
        process.env.NODE_ENV === "dev" && error.statusCode === 500
            ? "InternalServerError"
            : error.name;
    const errorMessage =
        process.env.NODE_ENV === "dev" && error.statusCode === 500
            ? "Internal Server Error"
            : error.message;
    return res.status(error.statusCode || 500).json({
        error: {
            name: errorName,
            message: errorMessage,
        },
    });
}

module.exports = {
    errorHandler
}