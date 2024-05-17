import Joi from "joi";

export const inputsForProducts = [
    { name: 'title', type: 'text', label: 'title', required: true },
    { name: 'description', type: 'textarea', label: 'description', required: true },
    { name: 'howToUse', type: 'textarea', label: 'how to use', required: true },
    { name: 'Ingredients', type: 'textarea', label: 'Ingredients', required: true },
    { name: 'price', type: 'number', label: 'price', required: true },
    { name: 'discount', type: 'number', label: 'discount', required: true },
    { name: 'imgUrl', type: 'text', label: 'Img Url', required: true },
    { name: 'imgAlt', type: 'text', label: 'Img Alt', required: true },
    { name: 'category', type: 'select', label: 'Category', required: true, options: ['All Products', 'Face', 'Eyes', 'Body', 'Hands', 'Feet'] },
];

export const schema = Joi.object({
    title: Joi.string().min(2).max(19).trim().required(),
    description: Joi.string().min(10).max(900).trim().required(),
    howToUse: Joi.string().min(10).max(900).trim().required(),
    Ingredients: Joi.string().min(10).max(900).trim().required(),
    price: Joi.number().required(),
    discount: Joi.number(),
    imgUrl: Joi.string().uri().required(),
    imgAlt: Joi.string().required(),
    category: Joi.string().valid('All Products', 'Face', 'Eyes', 'Body', 'Hands', 'Feet').required(),
});