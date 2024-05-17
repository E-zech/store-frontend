import React from 'react';
import "./About.css";
import "./AboutMediaQ.css";
import { GiBarefoot } from "react-icons/gi";
import { FaHandSparkles } from "react-icons/fa";
import { IoBody } from "react-icons/io5";
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { useContext } from 'react';
import { GeneralContext } from '../../App';

export default function About() {
    const { mode, mainTitleMode } = useContext(GeneralContext);

    const iconStyle = {
        size: 100,
        '@media (max-width: 1000px)': {
            size: 50
        }
    };

    return (
        <>
            <section className='about-wrapper' style={{ background: mode === 'dark' ? 'black' : '' }}>
                <h1 className='main-title' style={mainTitleMode}>About Us</h1>

                <section className='container-about'>
                    <div className='about-grid'>
                        <div className='div1 txt'>
                            <h2>Our Story</h2>
                            <p>Welcome to our skincare haven! We started with a simple vision: to make skincare accessible, effective, and enjoyable for everyone. Our journey began with a deep passion for healthy, radiant skin.</p>
                            <p>Driven by the desire to provide high-quality skincare solutions, we embarked on a mission to curate a collection of products that nourish, protect, and enhance your skin's natural beauty.</p>
                        </div>

                        <div className='div2 txt'>
                            <h2>Our Mission</h2>
                            <p>At our core, we believe that skincare should be more than just a routine; it should be a ritual of self-care and self-love. Our mission is to empower individuals to embrace their unique skin journey with confidence.</p>
                            <p>We strive to create a community where skincare enthusiasts can explore, learn, and discover the perfect products for their specific needs.</p>
                        </div>

                        <div className='div3 txt'>
                            <h2>Our Commitment</h2>
                            <p>Quality is non-negotiable for us. We meticulously select each product in our inventory, ensuring that they meet our stringent standards for efficacy, safety, and sustainability.</p>
                            <p>From luxurious facial serums to nourishing body creams, every item is thoughtfully curated to deliver noticeable results while respecting your skin and the environment.</p>
                        </div>

                        <div className='div4 txt'>
                            <h2>Our Values</h2>
                            <p>Discover what drives us at our core. Our values are the guiding principles that shape everything we do.</p>
                            <p>At our skincare shop, we are committed to transparency, efficacy, and sustainability. These values drive our product selection, customer service, and overall mission.</p>
                        </div>

                        <div className='div5 txt'>
                            <h2>Customer Satisfaction</h2>
                            <p>Your satisfaction is our top priority. We are dedicated to providing exceptional customer service, from personalized skincare recommendations to prompt assistance with any inquiries or concerns.</p>
                            <p>Join us on this journey to healthier, happier skin. Let's embark on a skincare adventure together!</p>
                        </div>

                        <div className="div6 bgc"> <MdOutlineFaceRetouchingNatural sx={iconStyle} /></div>
                        <div className="div7 bgc"> <IoEyeSharp sx={iconStyle} /></div>
                        <div className="div8 bgc"> <IoBody sx={iconStyle} /></div>
                        <div className="div9 bgc"> <FaHandSparkles sx={iconStyle} /></div>
                        <div className="div10 bgc"> <GiBarefoot sx={iconStyle} /></div>
                    </div>
                </section>
            </section>
        </>
    )
}
