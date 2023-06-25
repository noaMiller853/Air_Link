const Joi=require("joi")
exports.validateDrone = (_reqBody) => {
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        model: Joi.string().min(2).max(99).required(),
        speed: Joi.number().integer().min(1).required(),
        image:Joi.string().allow(null).optional()
    });
    return schemaJoi.validate(_reqBody);
};