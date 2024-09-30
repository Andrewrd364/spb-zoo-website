import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { fetchVacancies, createVacancy, updateVacancy, deleteVacancy } from "../../services/api"; 

const VacancyCRUD = () => {
  const [vacancies, setVacancies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    content: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadVacancies(); 
  }, []);

  const loadVacancies = async () => {
    try {
      const allVacancies = await fetchVacancies(); 
      setVacancies(allVacancies.data); 
    } catch (error) {
      console.error("Ошибка при загрузке вакансий:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("content", formData.content);

    try {
      if (editMode) {
        await updateVacancy(editId, form); 
      } else {
        await createVacancy(form); 
      }
      loadVacancies(); 
      resetForm(); 
    } catch (error) {
      console.error("Ошибка при сохранении вакансии:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      content: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (vacancyItem) => {
    setFormData({
      name: vacancyItem.name,
      content: vacancyItem.content || "",
    });
    setEditId(vacancyItem.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    await deleteVacancy(id);
    loadVacancies(); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Вакансии</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Название вакансии</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={5}
            required
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
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {vacancies.map((vacancyItem) => (
            <tr key={vacancyItem.id}>
              <td>{vacancyItem.name}</td>
              <td>{vacancyItem.content}</td>
              <td>
                <Button onClick={() => handleEdit(vacancyItem)}>Редактировать</Button>
                <Button variant="danger" onClick={() => handleDelete(vacancyItem.id)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VacancyCRUD;
