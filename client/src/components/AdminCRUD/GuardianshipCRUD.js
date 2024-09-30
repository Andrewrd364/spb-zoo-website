import React, { useState, useEffect } from "react";
import { createGuardianship, updateGuardianship, deleteGuardianship, fetchGuardianships, fetchAnimals } from "../../services/api" // API функции для работы с сервером
import { Form, Button, Table } from "react-bootstrap";
import { IMAGE_URL } from "../../config";

const GuardianshipCRUD = () => {
  const [guardianships, setGuardianships] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    guardianUrl: "",
    animalId: "",
    guardianImg: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadAnimals();
    loadGuardianships();
  }, []);

  const loadGuardianships = async () => {
    try {
      const response = await fetchGuardianships();
      setGuardianships(response.data);
    } catch (error) {
      console.error("Ошибка загрузки опекунств:", error);
    }
  };
  const loadAnimals = async () => {
    try {
      const animalsData = await fetchAnimals(1, "", 1000);
      setAnimals(animalsData.data);
    } catch (error) {
      console.error("Ошибка при загрузке животных:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, guardianImg: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("guardianUrl", formData.guardianUrl);
    form.append("animalId", formData.animalId);
    if (formData.guardianImg) {
      form.append("guardianImg", formData.guardianImg);
    }

    try {
      if (editMode) {
        await updateGuardianship(editId, form);
      } else {
        await createGuardianship(form);
      }
      loadGuardianships();
      resetForm();
    } catch (error) {
      console.error("Ошибка при сохранении опекунства:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      guardianUrl: "",
      animalId: "",
      guardianImg: null,
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGuardianship(id);
      loadGuardianships();
    } catch (error) {
      console.error("Ошибка при удалении опекунства:", error);
    }
  };

  const handleEdit = (guardianship) => {
    setFormData({
      name: guardianship.name,
      guardianUrl: guardianship.guardianUrl || "",
      animalId: guardianship.animalId || "",
      guardianImg: null, 
    });
    setEditId(guardianship.id);
    setEditMode(true);
  };

  return (
    <div>
      <h2>Опека</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Имя опекуна</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="guardianUrl">
          <Form.Label>URL опекуна</Form.Label>
          <Form.Control
            type="url"
            name="guardianUrl"
            value={formData.guardianUrl}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="animalId">
          <Form.Label>Животное</Form.Label>
          <Form.Control
            as="select"
            name="animalId"
            value={formData.animalId || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Выберите животное</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Изображение</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {editMode ? "Обновить" : "Создать"}
        </Button>
        {editMode && (
          <Button variant="secondary" onClick={resetForm}>
            Отмена
          </Button>
        )}
      </Form>

      <h3>Список опекунств</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Имя опекуна</th>
            <th>URL</th>
            <th>Животное</th>
            <th>Изображение</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {guardianships.map((guardian) => (
            <tr key={guardian.id}>
              <td>{guardian.name}</td>
              <td>
                <a href={guardian.guardianUrl} target="_blank" rel="noopener noreferrer">
                  {guardian.guardianUrl}
                </a>
              </td>
              <td>{guardian.animal.name}</td>
              <td>
                {guardian.guardianImg && (
                  <img
                    src={`${IMAGE_URL}/${guardian.guardianImg}`}
                    alt={guardian.name}
                    width="100"
                  />
                )}
              </td>
              <td>
                <Button onClick={() => handleEdit(guardian)}>
                  Редактировать
                </Button>
                <Button variant="danger" onClick={() => handleDelete(guardian.id)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GuardianshipCRUD;
