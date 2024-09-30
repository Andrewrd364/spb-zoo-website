import React, { useEffect, useState } from "react";
import { Table, Image } from "react-bootstrap";
import { fetchGuardianships } from "../services/api";
import AnimalCard from "../components/AnimalCard/AnimalCard";
import { IMAGE_URL } from "../config";

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
        setError("Ошибка при загрузке данных");
        setLoading(false);
      }
    };

    loadGuardianships();
  }, []);

  if (loading) {
    return <p></p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 style={{ marginBottom: "50px" }}>Опекуны животных</h1>
      <div
        className="table-container"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
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
                <td
                  className="align-middle text-center"
                  style={{ width: "50%" }}
                >
                  <div style={{ maxWidth: "300px", margin: "0 auto" }}>
                    <AnimalCard animal={guardian.animal} />
                  </div>
                </td>
                <td
                  className="align-middle text-center"
                  style={{ width: "50%" }}
                >
                  {guardian.guardianImg && guardian.guardianUrl ? (
                    <div>
                      <a
                        href={guardian.guardianUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={`${IMAGE_URL}${guardian.guardianImg}`}
                          alt={guardian.name}
                          style={{
                            maxWidth: "300px",
                            objectFit: "cover",
                            display: "block",
                            margin: "0 auto",
                          }}
                        />
                      </a>
                      <a
                        href={guardian.guardianUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>{guardian.name}</p>
                      </a>
                    </div>
                  ) : guardian.guardianImg ? (
                    <div>
                      <Image
                        src={`${IMAGE_URL}${guardian.guardianImg}`}
                        alt={guardian.name}
                        style={{
                          maxWidth: "300px",
                          objectFit: "cover",
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                      <p>{guardian.name}</p>
                    </div>
                  ) : guardian.guardianUrl ? (
                    <a
                      href={guardian.guardianUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p>{guardian.name}</p>
                    </a>
                  ) : (
                    <p>{guardian.name}</p>
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
