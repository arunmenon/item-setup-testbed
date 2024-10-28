// src/services/api.js

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const enrichItem = (itemData) => {
  return axios.post(`${API_BASE_URL}/enrich-item`, itemData);
};

export const submitFeedback = (feedbackData) => {
  return axios.post(`${API_BASE_URL}/submit-feedback`, feedbackData);
};
