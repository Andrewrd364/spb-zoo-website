import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { fetchAnimals, createAnimal, updateAnimal, deleteAnimal, fetchSpeciesOptions } from "../../services/api";

const AnimalCRUD = () => {
  const [animals, setAnimals] = useState([]);
  const [species, setSpecies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    latinName: "",
    description: "",
    habitat: "",
    food: "",
    speciesId: "",
    imageUrl: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadAnimals();
    loadSpecies();
  }, []);

  const loadAnimals = async () => {
    try {
      const allAnimals = await fetchAnimals(1, "", 1000);
      setAnimals(allAnimals.data);
    } catch (error) {
      console.error("Ошибка при загрузке животных:", error);
    }
  };

  const loadSpecies = async () => {
    try {
      const speciesData = await fetchSpeciesOptions();
      setSpecies(speciesData);
    } catch (error) {
      console.error("Ошибка при загрузке видов:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("latinName", formData.latinName);
    form.append("description", formData.description);
    form.append("habitat", formData.habitat);
    form.append("food", formData.food);
    form.append("speciesId", formData.speciesId);

    if (formData.imageUrl) {
      form.append("imageUrl", formData.imageUrl);
    }

    try {
      if (editMode) {
        await updateAnimal(editId, form); 
      } else {
        await createAnimal(form); 
      }
      loadAnimals(); 
      resetForm();  
    } catch (error) {
      console.error("Ошибка при сохранении животного:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      latinName: "",
      description: "",
      habitat: "",
      food: "",
      speciesId: "",
      imageUrl: null,
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (animal) => {
    setFormData({
      name: animal.name,
      latinName: animal.latinName,
      description: animal.description,
      habitat: animal.habitat,
      food: animal.food,
      speciesId: animal.speciesId || "",
      imageUrl: null, 
    });
    setEditId(animal.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    await deleteAnimal(id);
    loadAnimals();
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
      <h2>Животные</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Имя</Form.Label>
          <Form.Control 
            type="text" 
            name="name"
            value={formData.name} 
            onChange={handleInputChange} 
            required
          />
        </Form.Group>

        <Form.Group controlId="latinName">
          <Form.Label>Латинское название</Form.Label>
          <Form.Control 
            type="text" 
            name="latinName"
            value={formData.latinName} 
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

        <Form.Group controlId="habitat">
          <Form.Label>Среда обитания</Form.Label>
          <Form.Control 
            type="text" 
            name="habitat"
            value={formData.habitat} 
            onChange={handleInputChange} 
            required
          />
        </Form.Group>

        <Form.Group controlId="food">
          <Form.Label>Питание</Form.Label>
          <Form.Control 
            type="text" 
            name="food"
            value={formData.food} 
            onChange={handleInputChange} 
            required
          />
        </Form.Group>

        <Form.Group controlId="speciesId">
          <Form.Label>Вид</Form.Label>
          <Form.Control
            as="select"
            name="speciesId"
            value={formData.speciesId}
            onChange={handleInputChange}
            required
          >
            <option value="">Выберите вид</option>
            {species.map((species) => (
              <option key={species.id} value={species.id}>
                {species.species}
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
            <th>Имя</th>
            <th>Латинское название</th>
            <th>Описание</th>
            <th>Среда обитания</th>
            <th>Питание</th>
            <th>Вид</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.name}</td>
              <td>{animal.latinName}</td>
              <td>{animal.description}</td>
              <td>{animal.habitat}</td>
              <td>{animal.food}</td>
              <td>{animal.species ? animal.species.species : "Не указано"}</td>
              <td>
                <Button onClick={() => handleEdit(animal)}>Редактировать</Button>
                <Button variant="danger" onClick={() => handleDelete(animal.id)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AnimalCRUD;
