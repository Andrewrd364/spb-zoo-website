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


export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке мероприятий:", error);
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
