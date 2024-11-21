import React from 'react'
import { Link } from "react-router-dom";
import "../Styles/Footer.css";
import image_Edunamica_Logo from '../Img/edunamica_logo.svg';
import image_Instagram from '../img/instagram.png';
import image_Facebook from '../img/facebook.png';
import image_LinkedIn from '../img/linkin.png';
import image_Tiktok from '../img/tiktok.png';
import image_Youtube from '../img/youtube.png';


const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-sections">
          <div className="footer-column">
            <h3>Security & Brand</h3>
            <ul>
              <li><Link to="/report-copyright"><p className="large-text">Report Copyright Infringement</p></Link></li>
              <li><Link to="/report-security"><p className="large-text">Report Security Issue</p></Link></li>
              <li><Link to="/trademark-notice"><p className="large-text">Trademark Notice</p></Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Website</h3>
            <ul>
              <li><Link to="/accessibility"><p className="large-text">Accessibility</p></Link></li>
              <li><Link to="/digital-accessibility"><p className="large-text">Digital Accessibility</p></Link></li>
              <li><Link to="/privacy"><p className="large-text">Privacy Statement</p></Link></li>
            </ul>
          </div>
          <div className="footer-column">
          <h3>Get In Touch</h3>
          <ul>
              <li><Link to="/contact"><p className="large-text">Contact Harvard</p></Link></li>
              <li><Link to="/maps"><p className="large-text">Maps & Directions</p></Link></li>
              <li><Link to="/jobs"><p className="large-text">Jobs</p></Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2024 Mirtha López & Amira Arguedas</p>

            <div>
            <img src={image_Edunamica_Logo} alt="Logo Edunamica" />
            </div>
          
          <div className="social-icons">
            <a href='https://www.instagram.com/edunamicanosara?igsh=MmsyeWRnMTBjNHgz' target="_blank" rel="noopener noreferrer">
                <img src={image_Instagram} alt="Red Social" />
            </a>

            <a href='https://www.facebook.com/share/1XJ5UCocdg/?mibextid=LQQJ4d' target="_blank" rel="noopener noreferrer">
                <img src={image_Facebook} alt="Red Social" />
            </a>

            <a href='https://cr.linkedin.com/company/edunamicacr' target="_blank" rel="noopener noreferrer">
                <img src={image_LinkedIn} alt="Red Social" />
            </a>

            <a href='https://www.tiktok.com/@edunamica' target="_blank" rel="noopener noreferrer">
                <img src={image_Tiktok} alt="Red Social" />
            </a>

            <a href='https://youtube.com/@edunamica?si=o1tgLBvgFA48cnt-' target="_blank" rel="noopener noreferrer">
                <img src={image_Youtube} alt="Red Social" />
            </a>
          </div>
        </div>
      </footer>
    );
};

export default Footer;