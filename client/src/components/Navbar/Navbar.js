import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import ServiceDropdown from '../ServiceDropdown';
import './Navbar.css'; // Подключаем стили для Navbar

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/');
  };

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar"> {/* Заменяем bg="light" на custom-navbar */}
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Зоопарк</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Посетителям" id="visitor-dropdown">
              <NavDropdown.Item as={Link} to="/animals">Животные</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/events">Мероприятия</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/hours">Часы работы</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/directions">Схема проезда</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/map">Карта зоопарка</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/souvenirs">Сувениры</NavDropdown.Item>
            </NavDropdown>

            <ServiceDropdown />

            <Nav.Link as={Link} to="/guardianship">Опека</Nav.Link>
            <Nav.Link as={Link} to="/tickets">Билеты</Nav.Link>
            <Nav.Link as={Link} to="/news">Новости</Nav.Link>
            <Nav.Link as={Link} to="/vacancies">Вакансии</Nav.Link>

            {token ? (
              <>
                <Nav.Link as={Link} to="/admin">Для администратора</Nav.Link>
                <Nav.Link onClick={handleLogout}>Выйти</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Вход</Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
