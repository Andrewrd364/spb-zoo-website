import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { fetchSouvenirs, createSouvenir, updateSouvenir, deleteSouvenir, fetchSouvenirCategories } from "../../services/api"; 

const SouvenirCRUD = () => {
  const [souvenirs, setSouvenirs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    inStock: false,
    categoryId: "",
    imageUrl: null
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadSouvenirs();
    loadCategories();
  }, []);

  const loadSouvenirs = async () => {
    try {
      const allSouvenirs = await fetchSouvenirs(1, "", 1000);
      setSouvenirs(allSouvenirs.data);
    } catch (error) {
      console.error("Ошибка при загрузке сувениров:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const categoryData = await fetchSouvenirCategories();
      setCategories(categoryData);
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("inStock", formData.inStock);
    form.append("categoryId", formData.categoryId);
    
    if (formData.imageUrl) {
      form.append("imageUrl", formData.imageUrl); 
    }

    try {
      if (editMode) {
        await updateSouvenir(editId, form); 
      } else {
        await createSouvenir(form);
      }
      loadSouvenirs(); 
      resetForm(); 
    } catch (error) {
      console.error("Ошибка при сохранении сувенира:", error);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", inStock: false, categoryId: "", imageUrl: null });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (souvenir) => {
    setFormData({
      name: souvenir.name,
      description: souvenir.description,
      inStock: souvenir.inStock,
      categoryId: souvenir.categoryId || "",
      imageUrl: null 
    });
    setEditId(souvenir.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    await deleteSouvenir(id);
    loadSouvenirs();
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
      <h2>Сувениры</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Название</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleInputChange} 
            required
          />
        </Form.Group>
        
        <Form.Group controlId="description">
          <Form.Label>Описание</Form.Label>
          <Form.Control 
            type="text" 
            name="description"
            value={formData.description} 
            onChange={handleInputChange} 
            required
          />
        </Form.Group>
        
        <Form.Group controlId="inStock">
          <Form.Check 
            type="checkbox" 
            name="inStock"
            label="В наличии" 
            checked={formData.inStock} 
            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })} 
          />
        </Form.Group>

        <Form.Group controlId="categoryId">
          <Form.Label>Категория</Form.Label>
          <Form.Control
            as="select"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
          >
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
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
            <th>Категория</th>
            <th>В наличии</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {souvenirs.map((souvenir) => (
            <tr key={souvenir.id}>
              <td>{souvenir.name}</td>
              <td>{souvenir.description}</td>
              <td>{souvenir.souvenir_category ? souvenir.souvenir_category.category : "Не указано"}</td>
              <td>{souvenir.inStock ? "Да" : "Нет"}</td>
              <td>
                <Button onClick={() => handleEdit(souvenir)}>Редактировать</Button>
                <Button variant="danger" onClick={() => handleDelete(souvenir.id)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SouvenirCRUD;
