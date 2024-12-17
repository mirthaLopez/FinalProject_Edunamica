import React, { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

// Importar servicios
import PostEvent from '../../Services/Events/PostEvent';
import GetEvents from '../../Services/Events/GetEvents';

// Importar estilos
import '../../Styles/Events/EventsForm.css';

const EventForm = () => {
  const [event_name, setEventName] = useState('');
  const [event_date, setEventDate] = useState('');
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([]);

  const [notyf] = useState(new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } }));

  // Obtener eventos
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await GetEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  // Agregar evento
  const AddEvent = async (e) => {
    e.preventDefault();

    try {
      const newEvent = await PostEvent(event_name, event_date, description);
      notyf.success('Evento agregado exitosamente!');
      setEvents([...events, newEvent]);
      setEventName('');
      setEventDate('');
      setDescription('');
    } catch (error) {
      notyf.error('Error al agregar el evento');
    }
  };

  return (
    <div className="main-div-event">
      <div className="main-div-form-event">
        <h1 className="title-event-form">Crear Evento</h1>
        <form onSubmit={AddEvent} className="form-container-event">
          <div className="form-item-event">
            <label>Nombre del Evento</label>
            <input
              type="text"
              value={event_name}
              onChange={(e) => setEventName(e.target.value)}
              className="input-event"
              required
            />
          </div>

          <div className="form-item-event">
            <label>Fecha del Evento</label>
            <input
              type="date"
              value={event_date}
              onChange={(e) => setEventDate(e.target.value)}
              className="input-event"
              required
            />
          </div>

          <div className="form-item-event">
            <label>Descripción</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-event"
              required
            />
          </div>

          <div className="form-item-event">
            <button type="submit" className="btn-send-event">Guardar Evento</button>
          </div>
        </form>
      </div>

      {/* Historial de eventos */}
      <div className="container-history-event">
        <h2 className="title-history-event">Historial de Eventos</h2>
        <div className="grid-event">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.event_name}</h3>
              <p>Fecha: {new Date(event.event_date).toLocaleDateString()}</p>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventForm;
