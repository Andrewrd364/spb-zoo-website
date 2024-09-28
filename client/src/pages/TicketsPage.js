// pages/TicketsPage.js

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { fetchTickets } from '../services/api';  // Импортируем наш API-запрос

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем билеты при загрузке страницы
  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data.data);  // Сохраняем список билетов
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      }
    };
    
    loadTickets();
  }, []);

  // Если данные еще загружаются
  if (loading) {
    return <p></p>;
  }

  // Если произошла ошибка при загрузке данных
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Билеты</h1>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.name}</td>
              <td>{ticket.description || 'Нет описания'}</td> {/* Проверка на наличие описания */}
              <td>{ticket.price !== null ? `${ticket.price}₽` : 'Бесплатно'}</td> {/* Проверка на наличие цены */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TicketsPage;
