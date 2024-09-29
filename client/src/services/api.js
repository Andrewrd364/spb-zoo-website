import axios from "axios";
import { API_URL } from "../config";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Ошибка при авторизации: " + error.response?.data?.message ||
        error.message
    );
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/service`);
    return response.data.data;
  } catch (error) {
    console.error("Ошибка при загрузке услуг:", error);
    throw error;
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/service/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка при загрузке услуги с ID: ${id}`, error);
    throw error;
  }
};


export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/event/`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении мероприятий:', error);
    throw error;
  }
};
export const fetchEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/event/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных мероприятия:', error);
    throw error;
  }
};

export const fetchAnimals = async (currentPage, speciesId, limit) => {
  try {
    const response = await axios.get(`${API_URL}/animal/`, {
      params: {
        page: currentPage,
        species: speciesId,
        limit: limit,     
      },
    });
    return {
      data: response.data.data,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching animals:", error);
    return { data: [], totalPages: 0 };
  }
};

export const fetchSpeciesOptions = async () => {
  try {
    const response = await axios.get(`${API_URL}/species`);
    return response.data;
  } catch (error) {
    console.error("Error fetching species options:", error);
    return [];
  }
};

export const fetchAnimalById = async (id) => {
  const response = await axios.get(`${API_URL}/animal/${id}`);
  return response.data;
};

export const fetchNews = async (category = "") => {
  const response = await axios.get(`${API_URL}/news`, {
    params: {
      category, // добавляем параметр категории
    },
  });
  return response.data;
};

// Функция для получения списка категорий
export const fetchNewsCategories = async () => {
  const response = await axios.get(`${API_URL}/newsCategories`);
  return response.data;
};

export const fetchNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/news/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении новости', error);
    throw error;
  }
};

export const fetchTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}/ticket`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const fetchGuardianships = async () => {
  try {
    const response = await axios.get(`${API_URL}/guardianship`);
    return response.data;
  } catch (error) {
    console.error("Error fetching guardianships:", error);
    throw error;
  }
};

export const fetchSouvenirs = async (page = 1, category = "", limit = 12, inStock = null) => {
  let url = `${API_URL}/souvenir?page=${page}&limit=${limit}`;
  
  if (category) {
    url += `&category=${category}`;
  }
  
  if (inStock !== null) {
    url += `&inStockOnly=${inStock}`;
  }
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении сувениров:', error);
    throw error;
  }
};

// Запрос для получения категорий сувениров
export const fetchSouvenirCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/souvenirCategories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching souvenir categories:", error);
    return [];
  }
};

export const fetchVacancies = async () => {
  try {
      const response = await axios.get(`${API_URL}/vacancy`);
      return {
          data: response.data.data,
      };
  } catch (error) {
      console.error("Error fetching vacancies:", error);
      return { data: [] };
  }
};
