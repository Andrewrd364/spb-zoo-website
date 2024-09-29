import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../services/api";  // Предполагается, что у вас есть этот API метод
import { IMAGE_URL } from "../config";

function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const eventData = await fetchEventById(id);  // Получаем данные мероприятия по id
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

  // Форматирование даты мероприятия в формат dd.mm.yyyy
  const formattedDate = new Date(event.date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="container mt-5">
      <div className="text-center">
        <img
          src={`${IMAGE_URL}${event.imageUrl}`}  // URL изображения мероприятия
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
        <p className="text-muted">{formattedDate}</p> {/* Дата мероприятия */}
      </div>
      <div className="mt-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <p>{event.description}</p>  {/* Описание мероприятия */}
        <p><strong>Цена:</strong> {event.price ? `${event.price}₽` : 'Бесплатно'}</p> {/* Цена мероприятия */}
      </div>
    </div>
  );
}

export default EventDetailPage;
