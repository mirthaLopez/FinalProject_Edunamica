import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../Styles/Carrousel.css';
import fotoCarrousel2 from '../Img/Edunamica_coworking.jpeg';
import fotoCarrousel1 from '../Img/FrontDesk.jpeg';
import yellowCircle from '../Img/yellow_circle-.svg';
import blueCircle from '../Img/blue_circle.svg';

//import fotoCarrousel2 from '../Img/Equipo.jpeg';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
    <Carousel activeIndex={index} onSelect={handleSelect} interval={2000}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fotoCarrousel2}
          alt="First slide"
        /> 
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fotoCarrousel1}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={fotoCarrousel1}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    <div className="about-edunamica">
    <div className="image-container top-right">
        <img src={yellowCircle} alt="Yellow Circle" />
    </div>
    <div className="text-container">
        <p>EDUNÁMICA es una organización no gubernamental, sin fines de lucro, que promueve el acceso a la educación de calidad para niños, niñas, jóvenes y adultos con situación socioeconómica desfavorable.</p>
    </div>
    <div className="image-container bottom-right">
        <img src={blueCircle} alt="Blue Circle" />
    </div>
</div>
    </div>
  );
}

export default ControlledCarousel;