import * as React from "react";
import { useContext } from "react";
import { GeneralContext } from "../../App";
import { useNavigate } from "react-router-dom";
import './PopUpLogin.css';

export default function PopUpLogin() {
    const navigate = useNavigate();
    const { setPopUpLogin } = useContext(GeneralContext);

    return (
        <>
            <section className="popUpContainer">
                <div className="popUpWrapper">

                    <div className="popUpText">
                        Login Or Sign Up required to add items to cart or favorites.
                    </div>

                    <div className="popUpBtnWrapper">
                        <button className="popUpBtn" onClick={() => { setPopUpLogin(false); navigate('/login') }}>
                            Login
                        </button>

                        <button className="popUpBtn" onClick={() => { setPopUpLogin(false); navigate('/signup') }}>
                            Sign Up
                        </button>


                        <button className="popUpBtn" onClick={() => setPopUpLogin(false)}>
                            Continue as Guest
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}


