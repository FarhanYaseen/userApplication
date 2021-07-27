const Joi = require('joi');
const { STATUS_CODES } = require('../constants');

const signUpSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object()
    .keys({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(6).optional(),
    })
    .or('firstName', 'lastName', 'email', 'password') // At least one of these keys must be in the object to be valid.
    .required()


function validateSignUp(req, res, next) {
    return validate(req, res, next, signUpSchema);

}
function validateSignIn(req, res, next) {
    return validate(req, res, next, signInSchema);
}


function validateUpdate(req, res, next) {
    return validate(req, res, next, updateSchema);
}


const validate = (req, res, next, schema) => {
    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        // on fail return comma separated errors
        const message = `Validation error: ${error.details.map(x => x.message).join(', ')}`;
        res.status(STATUS_CODES.BAD_REQUEST).json({
            message
        });
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }

}
module.exports = {
    validateSignUp,
    validateSignIn,
    validateUpdate
}