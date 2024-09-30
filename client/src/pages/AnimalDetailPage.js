import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAnimalById } from "../services/api";
import { IMAGE_URL } from "../config";

function AnimalDetailPage() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnimal = async () => {
      try {
        const animalData = await fetchAnimalById(id);
        setAnimal(animalData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnimal();
  }, [id]);

  if (loading) {
    return <div></div>;
  }

  if (!animal) {
    return <div>Животное не найдено</div>;
  }

  const hasNewsOrEvents = (animal.news && animal.news.length > 0) || (animal.events && animal.events.length > 0);

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <div className="row align-items-center" style={{ maxWidth: "1000px" }}>
        <div className="col-md-6 text-center">
          <img
            src={`${IMAGE_URL}${animal.imageUrl}`}
            alt={animal.name}
            className="img-fluid rounded"
            style={{ maxHeight: "500px", objectFit: "cover", width: "100%", border: "1px solid black" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">{animal.name}</h1>
          <h4 className="text-center text-muted">
            <em>{animal.latinName}</em>
          </h4>
          <p>
            <strong>Вид:</strong> {animal.species.species}
          </p>
          <p>
            <strong>Описание:</strong> {animal.description}
          </p>
          <p>
            <strong>Среда обитания:</strong> {animal.habitat}
          </p>
          <p>
            <strong>Еда:</strong> {animal.food}
          </p>
        </div>
      </div>

      {hasNewsOrEvents && (
        <div className="mt-5" style={{ maxWidth: "1000px", width: "100%" }}>
          <h2 className="text-center mb-4">Новости и мероприятия, связанные с этим животным</h2>
          <ul className="list-group">

            {animal.news.map((newsItem) => (
              <li key={newsItem.id} className="list-group-item">
                <Link to={`/news/${newsItem.id}`}>{newsItem.title} (Новость)</Link>
              </li>
            ))}

            {animal.events.map((eventItem) => (
              <li key={eventItem.id} className="list-group-item">
                <Link to={`/event/${eventItem.id}`}>{eventItem.title} (Мероприятие)</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AnimalDetailPage;
