import React from "react";

function HoursPage() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Часы работы зоопарка</h1>

      <div className="mb-4">
        <h3>Зоопарк:</h3>
        <p>Мы работаем ежедневно с 10:00 до 20:00.</p>
        <p>Вход возможен только до 19:00.</p>
      </div>

      <div className="mb-4">
        <h3>Детский зоопарк:</h3>
        <p>Ежедневно с 10:00 до 17:45</p>
        <p>(отменяется при неблагоприятных погодных условиях)</p>
        <p>Перерыв с 13:00 до 14:00</p>
      </div>

      <div className="mb-4">
        <h3>Кафе:</h3>
        <p>Ежедневно с 11:00 до 20:00</p>
      </div>
      <div className="mb-4">
        <h3>Круг катания на лошадях:</h3>
        <p>Круг катания работает без выходных.</p>
        <p>Режим работы с 11.00 до 18.00.</p>
        <p>Обед 14:00-15:00.</p>
      </div>
    </div>
  );
}

export default HoursPage;
