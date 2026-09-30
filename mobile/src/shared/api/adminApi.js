import { apiClient } from './apiClient';

export const listUsersAPI = async () => apiClient('/users', { method: 'GET' });
export const getUserAPI = async (id) => apiClient(`/users/${id}`, { method: 'GET' });
export const updateUserAPI = async (id, data) => apiClient(`/users/${id}`, { method: 'PUT', body: data });
export const deleteUserAPI = async (id) => apiClient(`/users/${id}`, { method: 'DELETE' });

export const listProfessorsAPI = async () => apiClient('/professors', { method: 'GET' });
export const deleteProfessorAPI = async (id) => apiClient(`/professors/${id}`, { method: 'DELETE' });

export const listParentsAPI = async () => apiClient('/parents', { method: 'GET' });
export const deleteParentAPI = async (id) => apiClient(`/parents/${id}`, { method: 'DELETE' });

export const listStudentsAPI = async () => apiClient('/students', { method: 'GET' });
export const deleteStudentAPI = async (id) => apiClient(`/students/${id}`, { method: 'DELETE' });
export const updateStudentAPI = async (id, data) => apiClient(`/students/${id}`, { method: 'PUT', body: data });
