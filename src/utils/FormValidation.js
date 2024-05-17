import Joi from 'joi';

export const clientStructure = [
  { name: 'firstName', type: 'text', label: 'First Name', required: true, block: false },
  { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false },
  { name: 'phone', type: 'text', label: 'Phone', required: true, block: false },
  { name: 'email', type: 'email', label: 'Email', required: true, block: false },
  { name: 'password', type: 'password', label: 'Password', required: true, block: false, initialOnly: true },
  { name: 'city', type: 'text', label: 'City', required: true, block: false },
  { name: 'street', type: 'text', label: 'Street', required: true, block: false },
  { name: 'houseNumber', type: 'number', label: 'House Number', required: true, block: false },
  { name: 'zip', type: 'text', label: 'zip', required: true, block: false },
  { name: 'imgSrc', type: 'text', label: 'imgSrc', required: false, block: false },
  { name: 'imgAlt', type: 'text', label: 'imgAlt', required: false, block: true },
];

export const schema = Joi.object({
  firstName: Joi.string().min(2).max(20).label('First Name').required(),
  lastName: Joi.string().min(2).max(20).label('Last Name').required(),
  phone: Joi.string().pattern(/^(\d{3}-)?\d{7}$/).message('Phone must be in the format 05X-XXXXXXX ').required(),
  email: Joi.string().email({ tlds: false }).lowercase().trim().required(),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{9,}$/)
    .message('Password must be 9 characters long and include 1 uppercase letter, 1 lowercase letter, 1 special character, and numbers.')
    .required(),
  city: Joi.string().min(2).max(56).label('city').required(),
  street: Joi.string().min(2).max(56).label('street').required(),
  houseNumber: Joi.number().min(1).label('houseNumber').required(),
  zip: Joi.string().min(3).max(9).label('zip').required(),
  imgSrc: Joi.string().uri().label('img Src').allow(""),
  imgAlt: Joi.string().min(5).max(100).label('img Alt').allow(""),
}).options({ abortEarly: false });


export const ClientStructureNoPassword = [
  { name: 'firstName', type: 'text', label: 'First Name', required: true, block: false },
  { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false },
  { name: 'phone', type: 'text', label: 'Phone', required: true, block: false },
  { name: 'email', type: 'email', label: 'Email', required: true, block: false },
  { name: 'city', type: 'text', label: 'City', required: true, block: false },
  { name: 'street', type: 'text', label: 'Street', required: true, block: false },
  { name: 'houseNumber', type: 'number', label: 'House Number', required: true, block: false },
  { name: 'zip', type: 'text', label: 'zip', required: true, block: false },
  { name: 'imgSrc', type: 'text', label: 'imgSrc', required: false, block: false },
  { name: 'imgAlt', type: 'text', label: 'imgAlt', required: false, block: false },
];


export const SchemaNoPassword = Joi.object({
  firstName: Joi.string().min(2).max(20).label('first name').required(),
  lastName: Joi.string().min(2).max(20).label('last name').required(),
  roleType: Joi.number().default(2),
  phone: Joi.string().pattern(/^(\d{3}-)?\d{7}$/).message('Phone must be in the format 05X-XXXXXXX ').required(),
  email: Joi.string().email({ tlds: false }).lowercase().trim().required(),
  city: Joi.string().min(2).max(56).label('city').required(),
  street: Joi.string().min(2).max(56).label('street').required(),
  houseNumber: Joi.number().min(1).label('houseNumber').required(),
  zip: Joi.string().min(3).max(9).label('zip').required(),
  imgSrc: Joi.string().min(5).max(555).label('img Src').allow(""),
  imgAlt: Joi.string().min(5).max(100).label('img Alt').allow(""),
}).options({ abortEarly: false });

export const PaymentStructure = [
  { name: 'nameOnCard', type: 'text', label: 'Name On Card', required: true, block: true },
  { name: 'cardNumber', type: 'text', label: 'Card Number', required: true, block: true },
  { name: 'expiryDate', type: 'text', label: 'Expiry Date', required: true, block: true },
  { name: 'cvv', type: 'string', label: 'CVV', required: true, block: true }
];

export const SchemaPayment = Joi.object({
  nameOnCard: Joi.string().required().min(3).max(56).messages({
    'string.empty': `Name on card is required`,
    'string.min': `Name on card must be at least {#limit} characters long`,
    'string.max': `Name on card cannot exceed {#limit} characters`,
  }),


  cardNumber: Joi.string().trim().required().messages({
    'string.empty': `Card number is required`,
    'string.pattern.base': `Card number must be a valid credit card number in the format XXXX-XXXX-XXXX-XXXX`,
  }).regex(/^[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/),


  expiryDate: Joi.string().trim().required().messages({
    'string.empty': `Expiry date is required`,
    'string.pattern.base': `Expiry date must be in MM/YY or MM/YYYY format`,
  }).regex(/^(0[1-9]|1[0-2])\/?(20[2-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3}|[0-9]{2})$/),

  cvv: Joi.string().regex(/^\d{3}$/).required().messages({
    'string.pattern.base': `CVV must be a 3-digit number`,
    'any.required': `CVV is required`,
  }),
}).options({ abortEarly: false });


