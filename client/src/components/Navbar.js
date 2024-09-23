import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ZooNavbar() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/service')
      .then(response => setServices(response.data.data))
      .catch(error => console.error('Ошибка при загрузке услуг:', error));
  }, []);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Зоопарк</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Посетителям" id="visitor-dropdown">
            <NavDropdown.Item as={Link} to="/animals">Животные</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/events">Мероприятия</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/hours">Часы работы</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/directions">Схема проезда</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/map">Карта зоопарка</NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Наши услуги" id="services-dropdown">
            {services.map(service => (
              <NavDropdown.Item key={service.id} as={Link} to={`/service/${service.id}`}>
                {service.title}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          <Nav.Link as={Link} to="/guardianship">Опека</Nav.Link>
          <Nav.Link as={Link} to="/tickets">Билеты</Nav.Link>
          <Nav.Link as={Link} to="/news">Новости</Nav.Link>
          <Nav.Link as={Link} to="/admin">Для администратора</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default ZooNavbar;
