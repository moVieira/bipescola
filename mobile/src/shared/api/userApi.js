import { apiClient } from './apiClient';

export const createParentAPI = async (parentData) => {
  return apiClient('/parents', {
    method: 'POST',
    body: parentData,
  });
};

export const createUserAPI = async (userData) => {
  return apiClient('/users', {
    method: 'POST',
    body: userData,
  });
};
