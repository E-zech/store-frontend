import React, { useState, useEffect } from 'react';
import './Slider.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const images = [
        'https://www.lorealparisusa.com/-/media/project/loreal/brand-sites/oap/americas/us/products/skin-care/facial-moisturizers/hero/moisturisers-category-page.jpg?rev=67bca7ae15654a52a773fd2d7fda6b31&cx=0.39&cy=0.5&cw=2000&ch=600&hash=C67E4DD8B5DA05AB5F5AA0133A799A9029391583',
        'https://www.lorealparis.ca/-/media/project/loreal/brand-sites/oap/americas/ca/articles/blog/skin_care/2000x900-layerskincare.jpg?rev=8e96360f249c46f18302176b9377a717&cx=0.45&cy=0.4&cw=2000&ch=600&hash=3654CAF15C5E0A6CCE1F4FFE29C3FF2F1CDDE71E',
        'https://www.matisfourways.co.za/shop/wp-content/uploads/2023/09/White-Beauty-Vloger-Linkedln-banner.jpg',
        'https://www.jeunesse.co.nz/wp-content/uploads/2020/10/Osmosis-Beauty-Banner.png',
    ];

    const nextSlide = () => {
        if (currentSlide === images.length - 1) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(images.length - 1);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isHovered) {
                nextSlide();
            }
        }, 2800);

        return () => clearInterval(interval);
    }, [currentSlide, isHovered]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='sliderContainer'>
            <div className='wrapBtns'>
                <button className='sliderBtn back' onClick={prevSlide}><ArrowForwardIosIcon /></button>
                <button className='sliderBtn foward' onClick={nextSlide}><ArrowForwardIosIcon /></button>
            </div>

            <img className='sliderImg' src={images[currentSlide]} alt={`Slide ${currentSlide}`} />
        </div>
    );
}
