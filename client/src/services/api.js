import axios from 'axios';

export const getServices = () => {
  return axios.get('http://localhost:5000/api/service')
    .then(response => response.data.data)
    .catch(error => console.error('Ошибка при загрузке услуг:', error));
};
