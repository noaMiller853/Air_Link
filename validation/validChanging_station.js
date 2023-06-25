const Joi=require("joi")
exports.validateChargingStation = (_reqBody) => {
    let schemaJoi = Joi.object({
        station_id: Joi.string().allow(null).optional(),
        station_number: Joi.number().integer().min(1).required(),
        occupied: Joi.boolean().required()
    });
    return schemaJoi.validate(_reqBody);
};