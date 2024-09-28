// pages/GuardianshipPage.js

import React, { useEffect, useState } from 'react';
import { Table, Image } from 'react-bootstrap';
import { fetchGuardianships } from '../services/api';
import AnimalCard from '../components/AnimalCard/AnimalCard';

function GuardianshipPage() {
  const [guardianships, setGuardianships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGuardianships = async () => {
      try {
        const data = await fetchGuardianships();
        setGuardianships(data.data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      }
    };

    loadGuardianships();
  }, []);

  if (loading) {
    return <p>Загрузка опекунств...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Опекуны животных</h1>
      
      {/* Ограничиваем ширину таблицы и центрируем её */}
      <div className="table-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="w-50">Животное</th>
              <th className="w-50">Опекун</th>
            </tr>
          </thead>
          <tbody>
            {guardianships.map((guardian) => (
              <tr key={guardian.id}>
                <td className="align-middle text-center" style={{ width: '50%' }}>
                  {/* Ограничиваем ширину карточки животного */}
                  <div style={{ maxWidth: '200px', margin: '0 auto' }}>
                    <AnimalCard animal={guardian.animal} />
                  </div>
                </td>
                <td className="align-middle text-center" style={{ width: '50%' }}>
                  {/* Логика отображения опекуна */}
                  {!guardian.guardianImg && !guardian.guardianUrl && (
                    <p>{guardian.name}</p>
                  )}

                  {!guardian.guardianImg && guardian.guardianUrl && (
                    <a href={guardian.guardianUrl} target="_blank" rel="noopener noreferrer">
                      {guardian.name}
                    </a>
                  )}

                  {guardian.guardianImg && guardian.guardianUrl && (
                    <div>
                      <a href={guardian.guardianUrl} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={guardian.guardianImg}
                          alt={guardian.name}
                          roundedCircle
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      </a>
                      <a href={guardian.guardianUrl} target="_blank" rel="noopener noreferrer">
                        <p>{guardian.name}</p>
                      </a>
                    </div>
                  )}

                  {guardian.guardianImg && !guardian.guardianUrl && (
                    <div>
                      <Image
                        src={guardian.guardianImg}
                        alt={guardian.name}
                        roundedCircle
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <p>{guardian.name}</p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default GuardianshipPage;
