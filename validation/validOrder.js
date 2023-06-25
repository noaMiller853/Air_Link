const Joi=require("joi")
exports.validateOrder = (_reqBody) => {
    let schemaJoi = Joi.object({
        drone_id:Joi.string().allow(null).optional(),
        origin_point: Joi.string().allow(null).optional(),
        destination_point:Joi.string().allow(null).optional()
    });
    return schemaJoi.validate(_reqBody);
};
