// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8081/autores';

const api = axios.create({
    baseURL: API_URL,
});

export const getAutores = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching authors:', error);
        throw error;
    }
};

export const getAutor = async (id) => {
    try {
        const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching author with id ${id}:`, error);
        throw error;
    }
};

export const createAutor = async (autorData) => {
    try {
        const response = await api.post('/', autorData);
        return response.data;
    } catch (error) {
        console.error('Error creating author:', error);
        throw error;
    }
};

export const uploadImage = async (formData) => {
    try {
        console.log("info",formData);
      const res = await api.post('/save-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return res.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };