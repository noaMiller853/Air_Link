const Joi = require("joi")

exports.validateBaseStation = (_reqBody) => {
    let schemaJoi = Joi.object({
    location: Joi.string().min(3).max(100).required()
    });
    return schemaJoi.validate(_reqBody);
};