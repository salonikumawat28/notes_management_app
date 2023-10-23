const Joi = require("joi");

const idSchema = Joi.string().required().messages({
  "string.empty": "Id cannot be empty",
  "any.required": "Id is required",
});

const nameSchema = Joi.string()
  .min(3)
  .max(255)
  .pattern(/^[a-zA-Z\s]+$/) // Allow only alphabets and spaces
  .messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name cannot be more than {#limit} characters long",
    "string.pattern.base": "Name must contain only letters and spaces",
  });

const searchQuerySchema = Joi.string().min(1).max(255).messages({
  "string.base": "Search query must be a string",
  "string.min": "Search query must be at least {#limit} characters long",
  "string.max": "Search query cannot be more than {#limit} characters long",
});

const emailSchema = Joi.string().email().min(5).max(255).messages({
  "string.base": "Email must be a string",
  "string.email": "Email must be a valid email address",
  "string.min": "Email must be at least {#limit} characters long",
  "string.max": "Email cannot be more than {#limit} characters long",
});

const comparablePasswordSchema = Joi.string().required().max(255).messages({
  "string.base": "Password must be a string",
  "string.empty": "Password cannot be empty",
  "any.required": "Password is required",
  "string.max": "Password cannot be more than {#limit} characters long",
});

const updatablePasswordSchema = Joi.string()
  .required()
  .min(8)
  .max(255)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
  .messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot be empty",
    "any.required": "Password is required",
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password cannot be more than {#limit} characters long",
    "string.pattern.base":
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
  });

const titleSchema = Joi.string().max(255).messages({
  "string.base": "Title must be a string",
  "string.max": "Title cannot be more than {#limit} characters long",
});

const contentSchema = Joi.string().max(2048).messages({
  "string.base": "Content must be a string",
  "string.max": "Content cannot be more than {#limit} characters long",
});

const loginBodySchema = Joi.object({
  email: emailSchema.required().messages({
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required.",
  }),
  password: comparablePasswordSchema,
});

const signUpBodySchema = Joi.object({
  name: nameSchema.required().messages({
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required",
  }),
  email: emailSchema.required().messages({
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required.",
  }),
  password: updatablePasswordSchema,
});

const updateUserBodySchema = Joi.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
}).or("name", "email");

const updatePasswordBodySchema = Joi.object({
  password: updatablePasswordSchema,
});

const createNoteBodySchema = Joi.object({
  title: titleSchema.optional(),
  content: contentSchema.optional(),
}).or("title", "content");

const updateNoteBodySchema = Joi.object({
  title: titleSchema.optional(),
  content: contentSchema.optional(),
}).or("title", "content");

const getNoteParamsSchema = Joi.object({
  id: idSchema,
});

const getNotesQueryParamsSchema = Joi.object({
  search: searchQuerySchema,
});

const updateNoteParamsSchema = Joi.object({
  id: idSchema,
});

const deleteNoteParamsSchema = Joi.object({
  id: idSchema,
});

module.exports = {
  loginBodySchema,
  signUpBodySchema,
  updateUserBodySchema,
  updatePasswordBodySchema,
  getNoteParamsSchema,
  getNotesQueryParamsSchema,
  createNoteBodySchema,
  updateNoteBodySchema,
  updateNoteParamsSchema,
  deleteNoteParamsSchema,
};
