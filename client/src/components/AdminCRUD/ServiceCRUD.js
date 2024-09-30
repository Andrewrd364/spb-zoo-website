/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { getServices, createService, updateService, deleteService } from "../../services/api";

const ServiceCRUD = ({ onServicesChange }) => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const loadServices = useCallback(async () => {
    try {
      const allServices = await getServices();
      setServices(allServices.data);
    } catch (error) {
      console.error("Ошибка при загрузке услуг:", error);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);

    if (formData.imageUrl) {
      form.append("imageUrl", formData.imageUrl);
    }

    try {
      if (editMode) {
        await updateService(editId, form);
      } else {
        await createService(form);
      }
      loadServices();  
      resetForm();   
      onServicesChange(); 
    } catch (error) {
      console.error("Ошибка при сохранении услуги:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      imageUrl: null,
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (serviceItem) => {
    setFormData({
      title: serviceItem.title,
      description: serviceItem.description,
      price: serviceItem.price || "",
      imageUrl: null,
    });
    setEditId(serviceItem.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      loadServices();
      onServicesChange(); 
    } catch (error) {
      console.error("Ошибка при удалении услуги:", error);
    }
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
      <h2>Услуги</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Название услуги</Form.Label>
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
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {services.map((serviceItem) => (
            <tr key={serviceItem.id}>
              <td>{serviceItem.title}</td>
              <td>{serviceItem.description}</td>
              <td>{serviceItem.price ? `${serviceItem.price} руб.` : "Не указано"}</td>
              <td>
                <Button onClick={() => handleEdit(serviceItem)}>Редактировать</Button>
                <Button variant="danger" onClick={() => handleDelete(serviceItem.id)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ServiceCRUD;
