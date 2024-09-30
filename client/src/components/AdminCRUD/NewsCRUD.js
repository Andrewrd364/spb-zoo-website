import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { fetchNews, createNews, updateNews, deleteNews, fetchNewsCategories, fetchAnimals } from "../../services/api";

const NewsCRUD = () => {
  const [news, setNews] = useState([]);
  const [newsCategories, setNewsCategories] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: null,
    category: "", 
    animalId: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadNews();
    loadNewsCategories();
    loadAnimals();
  }, []);

  const loadNews = async () => {
    try {
      const allNews = await fetchNews("");
      setNews(allNews.data);
    } catch (error) {
      console.error("Ошибка при загрузке новостей:", error);
    }
  };

  const loadNewsCategories = async () => {
    try {
      const categoriesData = await fetchNewsCategories();
      setNewsCategories(categoriesData);
    } catch (error) {
      console.error("Ошибка при загрузке категорий новостей:", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("category", formData.category);

    if (formData.animalId) {
      form.append("animalId", formData.animalId);
    }

    if (formData.imageUrl) {
      form.append("imageUrl", formData.imageUrl);
    }

    try {
      if (editMode) {
        await updateNews(editId, form); 
      } else {
        await createNews(form); 
      }
      loadNews();  
      resetForm();  
    } catch (error) {
      console.error("Ошибка при сохранении новости:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      imageUrl: null,
      category: "",  
      animalId: null,
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (newsItem) => {
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      imageUrl: null,  
      category: newsItem.newsCategoryId || "", 
      animalId: newsItem.animalId || null,
    });
    setEditId(newsItem.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    await deleteNews(id);
    loadNews();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, imageUrl: file });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getAnimalNameById = (animalId) => {
    const animal = animals.find((a) => a.id === animalId);
    return animal ? animal.name : "Не указано";
  };

  return (
    <div>
      <h2>Новости</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Заголовок</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Контент</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Категория новостей</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Выберите категорию</option>
            {newsCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </Form.Control>
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
            <th>Заголовок</th>
            <th>Контент</th>
            <th>Категория</th>
            <th>Животное</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {news.map((newsItem) => (
            <tr key={newsItem.id}>
              <td>{newsItem.title}</td>
              <td>{newsItem.content}</td>
              <td>{newsItem.news_category.category ? newsItem.news_category.category : "Не указано"}</td>
              <td>{newsItem.animalId ? getAnimalNameById(newsItem.animalId) : "Не указано"}</td>
              <td>
                <Button onClick={() => handleEdit(newsItem)}>Редактировать</Button>
                <Button variant="danger" onClick={() => handleDelete(newsItem.id)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NewsCRUD;
