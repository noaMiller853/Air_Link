const Joi=require("joi")
exports.validateParkingStation = (_reqBody) => {
    let schemaJoi = Joi.object({
        station_id:  Joi.string().allow(null).optional(),
        parking_number: Joi.number().integer().min(1).required(),
        available: Joi.boolean().required()
    });
    return schemaJoi.validate(_reqBody);
};