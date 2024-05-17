import { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../App';
import './Footer.css';
import { black, font, mainColor } from '../../css/Main.style';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logoImgStyle, logoSpanStyleBig } from '../navbar/Navbar.style';

export default function Footer() {
  const navigate = useNavigate();
  const { user, userRoleType, mode, setMode } = useContext(GeneralContext);

  return (
    <>
      <footer className="footer" style={{
        backgroundColor: mode === 'dark' ? black : mainColor,
      }}>

        <section className='footerTop'>

          <div className='footerLogo' onClick={() => navigate('/')}>
            <img src="https://png.pngtree.com/png-vector/20221012/ourmid/pngtree-skincare-logo-png-image_6309022.png" alt="a logo photo" style={{
              ...logoImgStyle,
              filter: mode === 'dark' ? 'hue-rotate(30deg) brightness(191%)' : 'grayscale(90%)',
            }} />
            <span style={{
              ...logoSpanStyleBig,
              position: 'absolute',
              marginTop: '23px',
              color: mode === 'dark' ? 'white' : 'black',
              fontFamily: font,
            }}>S</span>

          </div>
          <div className='footerAboutBtn' onClick={() => navigate('/about')}>About Us</div>
          <div>Phone: 050-12345678</div>
          <div>Email: skinCare@gmail.com</div>

        </section>


        <hr className='footerHr' />

        <section className='footerBottom'>
          <div className="footer-icons">
            <a href='https://www.facebook.com' target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href='https://www.instagram.com' target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href='https://www.tiktok.com' target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
            <a href='https://www.twitter.com' target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href='https://www.linkedin.com' target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>

          <div>
            &copy; All Rights Reserved E.Z
          </div>

        </section>
      </footer>
    </>
  );
}
