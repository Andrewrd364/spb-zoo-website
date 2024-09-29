import React, { useEffect } from "react";
import directionsImage from "../assets/images/karta_sajt.jpg";

function DirectionsPage() {
    useEffect(() => {
      // Загрузка Яндекс.Карт после монтирования компонента
      const loadYandexMap = () => {
        window.ymaps.ready(initMap);
      };
  
      const initMap = () => {
        // Создаем карту
        const map = new window.ymaps.Map("yandex-map", {
          center: [59.952457, 30.306894], // Центр карты на зоопарк
          zoom: 15, // Масштаб карты
        });
  
        // Главный вход в зоопарк
        const mainEntrancePlacemark = new window.ymaps.Placemark([59.953334, 30.308576], {
          balloonContent: "Главный вход в зоопарк. Санкт-Петербург, Александровский парк, 1а",
          iconCaption: "1",
        });
  
        // Дополнительный вход в зоопарк
        const secondaryEntrancePlacemark = new window.ymaps.Placemark([59.951921, 30.306795], {
          balloonContent: "Вход в зоопарк. Санкт-Петербург, Александровский парк, 1а",
          iconCaption: "2",
        });
  
        // Добавляем метки на карту
        map.geoObjects.add(mainEntrancePlacemark);
        map.geoObjects.add(secondaryEntrancePlacemark);
      };
  
      // Асинхронная загрузка скрипта Яндекс.Карт
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.type = "text/javascript";
      script.onload = loadYandexMap;
      document.head.appendChild(script);
  
      // Удаление скрипта и карты при размонтировании компонента
      return () => {
        const mapContainer = document.getElementById("yandex-map");
        if (mapContainer) mapContainer.innerHTML = "";
        document.head.removeChild(script);
      };
    }, []);
  
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Схема проезда</h1>
  
        {/* Описание проезда */}
        <div className="mb-4">
          <p>
            Ближайшие станции метро: <strong>Горьковская</strong>, <strong>Спортивная</strong>.
          </p>
          <p>От обеих станций зоопарк находится в пешей доступности (примерно 11 минут).</p>
          <p>
            От ст. м. «Горьковская» ходят трамваи № 6, № 40; от ст. м. «Спортивная» трамваи № 6 и № 40.
          </p>
        </div>
  
        {/* Изображение схемы проезда */}
        <div className="text-center mb-4">
          <img
            src={directionsImage}
            alt="Схема проезда к зоопарку"
            className="img-fluid rounded"
            style={{
              maxHeight: "500px",
              maxWidth: "100%",
              objectFit: "contain",
              border: "1px solid black",
            }}
          />
        </div>
  
        {/* Интерактивная карта */}
        <div className="text-center mb-4">
          <h2>Интерактивная карта</h2>
          <div
          id="yandex-map"
          style={{
            width: "100%",
            maxWidth: "600px", // Ограничение ширины карты
            height: "400px",
            margin: "0 auto", // Центрирование карты
            border: "1px solid black",
          }}
        ></div>
        </div>
      </div>
    );
  }

export default DirectionsPage;
