import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsById } from "../services/api";
import { IMAGE_URL } from "../config";

function NewsDetailPage() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchNewsById(id);
        setNews(newsData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [id]);

  if (loading) {
    return <div></div>;
  }

  if (!news) {
    return <div>Новость не найдена</div>;
  }

  const formattedDate = new Date(news.createdAt).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="container mt-5">
      <div className="text-center">
        <img
          src={`${IMAGE_URL}${news.imageUrl}`}
          alt={news.title}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "300px", maxWidth: "600px", objectFit: "cover", width: "100%", border: "1px solid black" }}
        />
      </div>
      <div className="text-center">
        <h1>{news.title}</h1>
        <p className="text-muted">{formattedDate}</p>
      </div>
      <div className="mt-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <p>{news.content}</p>
      </div>
    </div>
  );
}

export default NewsDetailPage;
