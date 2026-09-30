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

export const createProfessorAPI = async (professorData) => {
  return apiClient('/professors', {
    method: 'POST',
    body: professorData,
  });
};

export const loginUserAPI = async (credentials) => {
  return apiClient('/users/login', {
    method: 'POST',
    body: credentials,
  });
};
