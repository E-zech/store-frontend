import { useContext } from 'react';
import { GeneralContext } from '../App';
import { black, mainColor, white } from '../css/Main.style';

export const initialFormData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    city: '',
    street: '',
    houseNumber: 0,
    zip: '',
    imgSrc: '',
    imgAlt: ''
};

export const initialFormDataNoPassword = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    street: '',
    houseNumber: 0,
    zip: '',
    imgSrc: '',
    imgAlt: ''
};

export const initialPayment = {
    nameOnCard: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
};


export const handleChange = (ev, formData, setFormData, errors, setErrors, schema, setIsFormValid) => {
    const { name, value } = ev.target;
    const obj = { ...formData, [name]: value };
    setFormData(obj);

    const validate = schema.validate(obj, { abortEarly: false });
    const tempErrors = { ...errors };
    delete tempErrors[name];

    if (validate.error) {
        const item = validate.error.details.find((e) => e.context.key === name);
        if (item) {
            tempErrors[name] = item.message;
        }
    }
    if (name in tempErrors && value === "") {
        delete tempErrors[name];
    }

    setErrors(tempErrors);

    const formIsValid =
        Object.keys(tempErrors).length === 0 &&
        Object.entries(obj).every(([name, value]) => {
            if (value === "" && (name === "imgSrc" || name === "imgAlt")) {
                return true;
            }
            return value !== "";
        });

    setIsFormValid(formIsValid);
};


export const useInputsFormColors = () => {
    const { mode } = useContext(GeneralContext);

    return {
        sx: {
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: mode === 'dark' ? white : mainColor,
                },
            },
            '& input::placeholder': {
                color: mode === 'dark' ? white : black,
            },
            '& .MuiInputLabel-root': {
                color: mode === 'dark' ? white : black,
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: mode === 'dark' ? white : mainColor,
            },
        },
    };
};
