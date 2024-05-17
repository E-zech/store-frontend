import Joi from 'joi';

export const checkoutSturcture = [
    { name: 'firstName', type: 'text', label: 'First Name', required: true, block: false },
    { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false },
    { name: 'phone', type: 'text', label: 'Phone', required: true, block: false },
    { name: 'email', type: 'email', label: 'Email', required: true, block: false },
    { name: 'address.state', type: 'text', label: 'State', required: true, block: false },
    { name: 'address.country', type: 'text', label: 'Country', required: true, block: false },
    { name: 'address.city', type: 'text', label: 'City', required: true, block: false },
    { name: 'address.street', type: 'text', label: 'Street', required: true, block: false },
    { name: 'address.houseNumber', type: 'number', label: 'House Number', required: true, block: false },
    { name: 'address.zip', type: 'number', label: 'zip', required: true, block: false },
];

export const schemaCheckout = Joi.object({
    firstName: Joi.string().min(2).max(20).label('First Name').required(),
    lastName: Joi.string().min(2).max(20).label('Last Name').required(),
    phone: Joi.string().pattern(/0[0-9]{2}\-?\s?[0-9]{3}\s?[0-9]{4}/).message('Phone must be 10 digits long').required(),
    email: Joi.string().email({ tlds: false }).lowercase().trim().required(),
    address: Joi.object({
        state: Joi.string().min(2).max(56).required(),
        country: Joi.string().min(2).max(56).label('country').required(),
        city: Joi.string().label('city').required(),
        street: Joi.string().label('street').required(),
        houseNumber: Joi.number().min(1).label('houseNumber').required(),
        zip: Joi.number().required(),
    }).required(),
}).options({ abortEarly: false });

