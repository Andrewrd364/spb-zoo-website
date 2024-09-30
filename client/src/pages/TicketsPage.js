import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { fetchTickets } from '../services/api'; 

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data.data); 
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      }
    };
    
    loadTickets();
  }, []);

  if (loading) {
    return <p></p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 style={{ marginBottom: '50px' }}>Билеты</h1>
      
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
              <td>{ticket.description || 'Нет описания'}</td> 
              <td>{ticket.price !== null ? `${ticket.price}₽` : 'Бесплатно'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TicketsPage;
