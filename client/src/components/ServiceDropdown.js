import React, { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';  // Импортируем наш сервис API

const ServiceDropdown = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Используем наш API сервис для загрузки списка услуг
    const fetchServices = async () => {
      try {
        const data = await getServices();  // Вызываем функцию для получения услуг
        setServices(data);
      } catch (error) {
        console.error('Ошибка при загрузке услуг:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <NavDropdown title="Наши услуги" id="services-dropdown">
      {services.length > 0 ? (
        services.map(service => (
          <NavDropdown.Item key={service.id} as={Link} to={`/service/${service.id}`}>
            {service.title} {/* Отображаем название услуги */}
          </NavDropdown.Item>
        ))
      ) : (
        <NavDropdown.Item>Загрузка услуг...</NavDropdown.Item>
      )}
    </NavDropdown>
  );
};

export default ServiceDropdown;
