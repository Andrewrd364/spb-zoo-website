import React from "react";
import mapImage from "../assets/images/map.jpg";

function MapPage() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Карта зоопарка</h1>
      
      <div className="text-center">
        <img
          src={mapImage}
          alt="Карта зоопарка"
          className="img-fluid rounded"
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "1px solid black",
          }}
        />
      </div>
    </div>
  );
}

export default MapPage;
