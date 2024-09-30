import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import ServiceDropdown from './ServiceDropdown';
import './Navbar.css';

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const serviceDropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Ленинградский Зоопарк</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Посетителям" id="visitor-dropdown" className="nav-dropdown">
              <NavDropdown.Item as={Link} to="/animals">Животные</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/events">Мероприятия</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/hours">Часы работы</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/directions">Схема проезда</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/map">Карта зоопарка</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/souvenirs">Сувениры</NavDropdown.Item>
            </NavDropdown>

            <ServiceDropdown ref={serviceDropdownRef} />

            <Nav.Link as={Link} to="/guardianship">Опека</Nav.Link>
            <Nav.Link as={Link} to="/tickets">Билеты</Nav.Link>
            <Nav.Link as={Link} to="/news">Новости</Nav.Link>
            <Nav.Link as={Link} to="/vacancies">Вакансии</Nav.Link>
          </Nav>
          
          <Nav className="ms-auto">
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
