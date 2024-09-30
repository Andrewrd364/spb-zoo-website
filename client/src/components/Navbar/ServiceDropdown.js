/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getServices } from '../../services/api';
import "./Navbar.css"

const ServiceDropdown = ({ onServicesChange }) => {
  const [services, setServices] = useState([]);

  const loadServices = useCallback(async () => {
    try {
      const data = await getServices();
      setServices(data.data);
      if (onServicesChange) onServicesChange(); 
    } catch (error) {
      console.error('Ошибка при загрузке услуг:', error);
    }
  }, [onServicesChange]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return (
    <NavDropdown title="Наши услуги" id="services-dropdown" className="nav-dropdown">
      {services.length > 0 ? (
        services.map(service => (
          <NavDropdown.Item key={service.id} as={Link} to={`/service/${service.id}`}>
            {service.title}
          </NavDropdown.Item>
        ))
      ) : (
        <NavDropdown.Item>Загрузка услуг...</NavDropdown.Item>
      )}
    </NavDropdown>
  );
};

export default ServiceDropdown;
