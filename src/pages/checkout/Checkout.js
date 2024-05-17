import { useState, useContext } from 'react';
import { GeneralContext } from "../../App";
import { ClientStructureNoPassword } from '../../utils/FormValidation';
import { initialPayment } from '../../utils/utils'
import Address from './address/Address';
import Payment from './payment/Payment';
import Review from './review/Review';
import OrderSum from './order summary/OrderSum';

export default function Checkout() {
    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [formPayment, setFormPayment] = useState(initialPayment);
    const { user, setUser, snackbar, setLoader, mode, mainTitleMode } = useContext(GeneralContext);

    const handleSubmit = ev => {
        ev.preventDefault();

        const obj = {};
        const elements = ev.target.elements;

        ClientStructureNoPassword.forEach((s) => {
            obj[s.name] = elements[s.name].value;
        });
        setLoader(true);

        fetch(`http://localhost:5000/users/${user._id}`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json', 'Authorization': localStorage.token },
            body: JSON.stringify(obj),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
                setLoader(false);
                snackbar("Update successful");
            })
            .catch(error => {
                console.error('Error updating user:', error);
                setLoader(false);
            });
    };


    return (
        <>
            <h1 className='main-title' style={mainTitleMode}>CHEKOUT</h1>
            {
                currentStep === 1 &&
                <Address errors={errors} setErrors={setErrors} setCurrentStep={setCurrentStep} handleSubmit={handleSubmit} />
            }

            {
                currentStep === 2 &&
                <Payment formPayment={formPayment} setFormPayment={setFormPayment} errors={errors} setErrors={setErrors} setCurrentStep={setCurrentStep} />
            }

            {
                currentStep === 3 &&
                <Review formPayment={formPayment} setCurrentStep={setCurrentStep} />
            }

            {
                currentStep === 4 &&
                <OrderSum />
            }
        </>
    )
}