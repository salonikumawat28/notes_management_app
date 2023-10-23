const { ValidationError } = require("../../errors/errors");
const {
  loginBodySchema,
  signUpBodySchema,
  updateUserBodySchema,
  getNoteParamsSchema,
  getNotesQueryParamsSchema,
  createNoteBodySchema,
  updateNoteBodySchema,
  updateNoteParamsSchema,
  updatePasswordBodySchema,
} = require("./validationSchema");

function validateSchema({ schemaBody, schemaParams, schemaQueryParams }) {
  return async (req, res, next) => {
    try {
      if (schemaBody) {
        // Validate request body
        await schemaBody.validateAsync(req.body, { abortEarly: false });
      }

      if (schemaParams) {
        // Validate request params
        await schemaParams.validateAsync(req.params, { abortEarly: false });
      }

      if (schemaQueryParams) {
        // Validate request query params
        await schemaQueryParams.validateAsync(req.query, { abortEarly: false });
      }

      // If validation passes, proceed to the next middleware
      req.validated = true;
      next();
    } catch (error) {
      const fieldErrors = [];
      const globalErrors = [];
      error.details.forEach((detail) => {
        if (detail.context && detail.context.key) {
          fieldErrors.push({
            field: detail.context.key,
            message: detail.message,
          });
        } else {
          globalErrors.push(detail.message);
        }
      });

      next(new ValidationError("Validation failed", fieldErrors, globalErrors));
    }
  };
}

const validateLogin = validateSchema({ schemaBody: loginBodySchema });
const validateSignup = validateSchema({ schemaBody: signUpBodySchema });
const validateGetUser = validateSchema({});
const validateUpdateUser = validateSchema({ schemaBody: updateUserBodySchema });
const validateUpdatePassword = validateSchema({
  schemaBody: updatePasswordBodySchema,
});
const validateDeleteUser = validateSchema({});
const validateGetNotes = validateSchema({schemaQueryParams: getNotesQueryParamsSchema});
const validateGetNote = validateSchema({
  schemaParams: getNoteParamsSchema,
});
const validateCreateNote = validateSchema({
  schemaBody: createNoteBodySchema,
});
const validateUpdateNote = validateSchema({
  schemaBody: updateNoteBodySchema,
  schemaParams: updateNoteParamsSchema,
});
const validateDeleteNote = validateSchema({
  schemaParams: updateNoteParamsSchema,
});

module.exports = {
  validateLogin,
  validateSignup,
  validateGetUser,
  validateUpdateUser,
  validateUpdatePassword,
  validateDeleteUser,
  validateGetNotes,
  validateGetNote,
  validateCreateNote,
  validateUpdateNote,
  validateDeleteNote,
};
