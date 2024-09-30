import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { fetchTickets, createTicket, updateTicket, deleteTicket } from "../../services/api"; 

const TicketCRUD = () => {
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTickets(); 
  }, []);

  const loadTickets = async () => {
    try {
      const allTickets = await fetchTickets(); 
      setTickets(allTickets.data); 
    } catch (error) {
      console.error("Ошибка при загрузке билетов:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description); 
    form.append("price", formData.price); 

    try {
      if (editMode) {
        await updateTicket(editId, form);
      } else {
        await createTicket(form); 
      }
      loadTickets(); 
      resetForm();
    } catch (error) {
      console.error("Ошибка при сохранении билета:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
    });
    setEditMode(false);
    setEditId(null);
  };

  const handleEdit = (ticketItem) => {
    setFormData({
      name: ticketItem.name,
      description: ticketItem.description || "",
      price: ticketItem.price || "",
    });
    setEditId(ticketItem.id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    await deleteTicket(id);
    loadTickets();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Билеты</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Название билета</Form.Label>
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
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
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
          {tickets.map((ticketItem) => (
            <tr key={ticketItem.id}>
              <td>{ticketItem.name}</td>
              <td>{ticketItem.description || "Нет описания"}</td>
              <td>{ticketItem.price ? `${ticketItem.price} руб.` : "Не указано"}</td>
              <td>
                <Button onClick={() => handleEdit(ticketItem)}>Редактировать</Button>
                <Button variant="danger" onClick={() => handleDelete(ticketItem.id)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TicketCRUD;
