import React, { useEffect, useState } from "react";

// SERVICIOS
import GetEvents from "../../src/Services/Events/GetEvents"

// ESTILOS CSS
import '../Styles/SliderEvents.css';

// IMPORTS DE SWIPER 
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'; 
import 'swiper/css/pagination'; 
import { Pagination, Autoplay } from 'swiper/modules';

// Componente de tarjeta de evento
const EventCard = ({ date, eventName, description }) => {
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
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await GetEvents(); // Llamada al servicio
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-slider-container">
      <h2 className="event-slider-title">Eventos Próximos</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <EventCard 
              date={event.event_date} 
              eventName={event.event_name} 
              description={event.description} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlider;
