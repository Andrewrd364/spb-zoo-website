import React from "react";
import './Footer.css'; // Подключаем стили

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          197198, г. Санкт-Петербург, вн. тер. г. муниципальный округ Кронверкское, парк Александровский, д. 1, литера А, ст. м. «Спортивная», «Горьковская» <br />
        </p>
        <p>
        Тел.: +7 (812) 232-82-60; +7 (921) 188-40-07
        </p>
        <p>
        Сайт создан Лисковым Андреем Романовичем
        </p>
      </div>
    </footer>
  );
};

export default Footer;
