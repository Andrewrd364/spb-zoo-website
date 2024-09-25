import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="row align-items-center" style={{ maxWidth: "1000px" }}>
        <div className="col-md-6 text-center">
          <img
            src={`${IMAGE_URL}${animal.imageUrl}`}
            alt={animal.name}
            className="img-fluid rounded"
            style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }}
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
    </div>
  );
}

export default AnimalDetailPage;
