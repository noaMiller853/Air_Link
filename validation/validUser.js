const Joi = require("joi")
exports.validUser = (_reqBody) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(3).max(99).required(),
        tel: Joi.string().min(10).max(10).required(),
        active: Joi.boolean().required()
    })
    return joiSchema.validate(_reqBody);
}
exports.loginUser = (_reqBody) => {
    const joiSchema = Joi.object({
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(3).max(99).required(),
        tel: Joi.string().min(10).max(10)
    })
    return joiSchema.validate(_reqBody);
}
