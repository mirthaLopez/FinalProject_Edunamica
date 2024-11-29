import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'; // Estilos básicos de Swiper
import 'swiper/css/pagination'; // Estilos para la paginación

// Importar los módulos desde Swiper
import { Pagination, Autoplay } from 'swiper/modules'; // Eliminar Navigation

// Importar tus estilos personalizados
import '../Styles/SliderEvents.css';

// Componente de tarjeta de evento
const EventCard = ({ date, eventName, description }) => {
  // Formateamos la fecha
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="event-card">
      <div className="event-card-header">
        <span className="event-card-date">{formattedDate}</span>
        <h3 className="event-card-title">{eventName}</h3>
      </div>
      <p className="event-card-description">{description}</p>
    </div>
  );
};

// Componente del Slider de eventos
const EventSlider = () => {
  const events = [
    {
      date: "2024-12-05",
      eventName: "Conferencia de React",
      description: "Únete a nosotros para una jornada de aprendizaje sobre ReactJS."
    },
    {
      date: "2024-12-12",
      eventName: "Hackathon de IA",
      description: "Compite y crea proyectos innovadores con Inteligencia Artificial."
    },
    {
      date: "2024-12-19",
      eventName: "Workshop de Diseño UX/UI",
      description: "Aprende las mejores prácticas en diseño de interfaces y experiencia de usuario."
    },
    {
      date: "2024-12-25",
      eventName: "Navidad Coding Marathon",
      description: "Desarrolla aplicaciones durante toda la noche para celebrar la Navidad."
    }
  ];

  return (
    <div className="event-slider-container">
      <h2 className="event-slider-title">Eventos Próximos</h2> {/* Añadir título */}
      <Swiper
        spaceBetween={20} // Espacio entre los slides
        slidesPerView={1} // Número de slides visibles
        loop={true} // Desplazamiento infinito
        pagination={{ clickable: true }} // Paginación con puntos
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Configuración de autoplay
        modules={[Pagination, Autoplay]} // Usar los módulos de Pagination y Autoplay
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          }
        }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <EventCard 
              date={event.date}
              eventName={event.eventName}
              description={event.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlider;