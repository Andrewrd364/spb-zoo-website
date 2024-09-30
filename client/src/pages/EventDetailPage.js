import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../services/api";  
import { IMAGE_URL } from "../config";

function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const eventData = await fetchEventById(id);  
        setEvent(eventData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (loading) {
    return <div></div>;
  }

  if (!event) {
    return <div>Мероприятие не найдено</div>;
  }

  const formattedDate = new Date(event.date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="container mt-5">
      <div className="text-center">
        <img
          src={`${IMAGE_URL}${event.imageUrl}`} 
          alt={event.title}
          className="img-fluid rounded mb-4"
          style={{
            maxHeight: "300px",
            maxWidth: "600px",
            objectFit: "cover",
            width: "100%",
            border: "1px solid black"
          }}
        />
      </div>
      <div className="text-center">
        <h1>{event.title}</h1>
        <p className="text-muted">{formattedDate}</p> 
      </div>
      <div className="mt-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <p>{event.description}</p>
        <p><strong>Цена:</strong> {event.price ? `${event.price}₽` : 'Бесплатно'}</p>
      </div>
    </div>
  );
}

export default EventDetailPage;
