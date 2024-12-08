import React from 'react'

//ESTILOS CSS
import "../../Styles/MainStyles/Footer.css";

//IMPORT DE IMÁGENES
import image_Edunamica_Logo from '../../Img/edunamica_logo.svg';
import image_Instagram from '../../img/instagram.png';
import image_Facebook from '../../img/facebook.png';
import image_LinkedIn from '../../img/linkin.png';
import image_Tiktok from '../../img/tiktok.png';
import image_Youtube from '../../img/youtube.png';

//IMPORT DE LINK TO
import {Link} from "react-router-dom";


const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer-sections">
          <div className="footer-column">
            <h3>Información General</h3>
            <ul>
              <li><Link to="https://edunamica.cr/"><p className="large-text">Página principal</p></Link></li>
              <li><Link to="https://edunamica.cr/nosara"><p className="large-text">Edunámica Sede Nosara</p></Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Informes evaluativos</h3>
            <ul>
              <li><Link to="https://edunamica.cr/informes-de-evaluacion"><p className="large-text">Informes evaluativos</p></Link></li>
              <li><Link to="https://edunamica.cr/informes"><p className="large-text">Informes</p></Link></li>
            </ul>
          </div>
          <div className="footer-column">
          <h3>Sección nformativa</h3>
          <ul>
              <li><Link to="https://edunamica.cr/galeria"><p className="large-text">Galería</p></Link></li>
              <li><Link to="https://edunamica.cr/edunews"><p className="large-text">EduNews</p></Link></li>
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