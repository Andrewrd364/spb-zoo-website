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
    return response.data;
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
export const updateService = async (id, service) => {
  const response = await axios.put(`${API_URL}/service/${id}`, service);
  return response.data;
};
export const deleteService = async (id) => {
  const response = await axios.delete(`${API_URL}/service/${id}`);
  return response.data;
};
export const createService = async (service) => {
    const response = await axios.post(`${API_URL}/service`, service);
    return response.data;
};


export const updateEvent = async (id, event) => {
  const response = await axios.put(`${API_URL}/event/${id}`, event);
  return response.data;
};
export const deleteEvent = async (id) => {
  const response = await axios.delete(`${API_URL}/event/${id}`);
  return response.data;
};
export const createEvent = async (event) => {
    const response = await axios.post(`${API_URL}/event`, event);
    return response.data;
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
export const updateAnimal = async (id, animal) => {
  const response = await axios.put(`${API_URL}/animal/${id}`, animal);
  return response.data;
};
export const deleteAnimal = async (id) => {
  const response = await axios.delete(`${API_URL}/animal/${id}`);
  return response.data;
};
export const createAnimal = async (animal) => {
    const response = await axios.post(`${API_URL}/animal`, animal);
    return response.data;
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
      category, 
    },
  });
  return response.data;
};
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
export const updateNews = async (id, news) => {
  const response = await axios.put(`${API_URL}/news/${id}`, news);
  return response.data;
};
export const deleteNews = async (id) => {
  const response = await axios.delete(`${API_URL}/news/${id}`);
  return response.data;
};
export const createNews = async (news) => {
    const response = await axios.post(`${API_URL}/news`, news);
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
export const updateTicket = async (id, ticket) => {
  const response = await axios.put(`${API_URL}/ticket/${id}`, ticket);
  return response.data;
};
export const deleteTicket = async (id) => {
  const response = await axios.delete(`${API_URL}/ticket/${id}`);
  return response.data;
};
export const createTicket = async (ticket) => {
    const response = await axios.post(`${API_URL}/ticket`, ticket);
    return response.data;
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
export const updateGuardianship = async (id, guardianship) => {
  const response = await axios.put(`${API_URL}/guardianship/${id}`, guardianship);
  return response.data;
};
export const deleteGuardianship = async (id) => {
  const response = await axios.delete(`${API_URL}/guardianship/${id}`);
  return response.data;
};
export const createGuardianship = async (guardianship) => {
    const response = await axios.post(`${API_URL}/guardianship`, guardianship);
    return response.data;
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
export const fetchSouvenirCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/souvenirCategories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching souvenir categories:", error);
    return [];
  }
};
export const createSouvenir = async (souvenir) => {
  try{
    const response = await axios.post(`${API_URL}/souvenir`, souvenir);
    return response.data;
  } catch(error){
    console.error("Error creating souvenir:", error);
    return [];
  }
  
};
export const updateSouvenir = async (id, souvenir) => {
  const response = await axios.put(`${API_URL}/souvenir/${id}`, souvenir);
  return response.data;
};
export const deleteSouvenir = async (id) => {
  const response = await axios.delete(`${API_URL}/souvenir/${id}`);
  return response.data;
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
export const updateVacancy = async (id, vacancy) => {
  const response = await axios.put(`${API_URL}/vacancy/${id}`, vacancy);
  return response.data;
};
export const deleteVacancy = async (id) => {
  const response = await axios.delete(`${API_URL}/vacancy/${id}`);
  return response.data;
};
export const createVacancy = async (vacancy) => {
    const response = await axios.post(`${API_URL}/vacancy`, vacancy);
    return response.data;
};
