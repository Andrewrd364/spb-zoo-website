import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { fetchEvents, createEvent, updateEvent, deleteEvent, fetchAnimals } from "../../services/api";

const EventCRUD = () => {
  const [events, setEvents] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    price: "",
    animalId: null,
    imageUrl: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadEvents();
    loadAnimals();
  }, []);

  const loadEvents = async () => {
    try {
      const allEvents = await fetchEvents(1, "", 1000);
      
      setEvents(allEvents.data);
    } catch (error) {
      console.error("Ошибка при загрузке мероприятий:", error);
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

  const getAnimalNameById = (animalId) => {
    const animal = animals.find((a) => a.id === animalId);
    return animal ? animal.name : "Не указано";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("date", formData.date);
    form.append("price", formData.price);

    if (formData.animalId) {
      form.append("animalId", formData.animalId);
    }

    if (formData.imageUrl) {
      form.append("imageUrl", formData.imageUrl); 
    }

    try {
      if (editMode) {
        await updateEvent(editId, form);
      } else {
        await createEvent(form); 
      }
      loadEvents(); 
      resetForm(); 
    } catch (error) {
      console.error("Ошибка при сохранении мероприятия:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      price: "",
      animalId: null,
      imageUrl: null,
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (eventItem) => {
    setFormData({
      title: eventItem.title,
      description: eventItem.description,
      date: new Date(eventItem.date).toISOString().split('T')[0], 
      price: eventItem.price || "",
      animalId: eventItem.animalId || null,
      imageUrl: null, 
    });
    setEditId(eventItem.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    loadEvents();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imageUrl: file });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Мероприятия</h2>
      <Form onSubmit={handleSubmit}>
        {/* Поля для ввода данных */}
        <Form.Group controlId="title">
          <Form.Label>Название мероприятия</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Дата мероприятия</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date} 
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Цена</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Введите цену или оставьте пустым"
          />
        </Form.Group>

        <Form.Group controlId="animalId">
          <Form.Label>Животное (может быть пустым)</Form.Label>
          <Form.Control
            as="select"
            name="animalId"
            value={formData.animalId || ""}
            onChange={handleInputChange}
          >
            <option value="">Не привязано к животному</option>
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

        <Button type="submit">{editMode ? "Обновить" : "Добавить"}</Button>
        {editMode && <Button variant="secondary" onClick={resetForm}>Отмена</Button>}
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Дата</th>
            <th>Цена</th>
            <th>Животное</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {events.map((eventItem) => (
            <tr key={eventItem.id}>
              <td>{eventItem.title}</td>
              <td>{eventItem.description}</td>
              <td>{new Date(eventItem.date).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" })}</td>
              <td>{eventItem.price ? `${eventItem.price} руб.` : "Бесплатно"}</td>
              <td>{eventItem.animalId ? getAnimalNameById(eventItem.animalId) : "Не указано"}</td>
              <td>
                <Button onClick={() => handleEdit(eventItem)}>Редактировать</Button>
                <Button variant="danger" onClick={() => handleDelete(eventItem.id)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EventCRUD;
