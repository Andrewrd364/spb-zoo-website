import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Tabs, Tab, Container } from "react-bootstrap";
import SouvenirCRUD from "../components/AdminCRUD/SouvenirCRUD";
import AnimalCRUD from "../components/AdminCRUD/AnimalCRUD";
import NewsCRUD from "../components/AdminCRUD/NewsCRUD";
import EventCRUD from "../components/AdminCRUD/EventCRUD";
import GuardianshipCRUD from "../components/AdminCRUD/GuardianshipCRUD";
import ServiceCRUD from "../components/AdminCRUD/ServiceCRUD";
import TicketCRUD from "../components/AdminCRUD/TicketCRUD";
import VacancyCRUD from "../components/AdminCRUD/VacancyCRUD";

const AdminPage = () => {
  const navigate = useNavigate();  
  const [key, setKey] = useState('souvenirs'); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);

  return (
    <Container>
      <h1 style={{ marginBottom: '50px' }} className="text-center mt-4">Админ Панель</h1>
      <Tabs
        id="admin-page-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="souvenirs" title="Сувениры">
          <SouvenirCRUD />
        </Tab>
        <Tab eventKey="animals" title="Животные">
          <AnimalCRUD />
        </Tab>
        <Tab eventKey="news" title="Новости">
          <NewsCRUD />
        </Tab>
        <Tab eventKey="events" title="Мероприятия">
          <EventCRUD  />
        </Tab>
        <Tab eventKey="guardianships" title="Опекунства">
          <GuardianshipCRUD  />
        </Tab>
        <Tab eventKey="services" title="Услуги">
          <ServiceCRUD />
        </Tab>
        <Tab eventKey="tickets" title="Билеты">
          <TicketCRUD />
        </Tab>
        <Tab eventKey="vacancies" title="Вакансии">
          <VacancyCRUD />
        </Tab>

      </Tabs>
    </Container>
  );
};

export default AdminPage;
