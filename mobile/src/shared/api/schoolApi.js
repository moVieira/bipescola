import { apiClient } from './apiClient';

export const listPostsAPI = async () => apiClient('/posts', { method: 'GET' });
export const createPostAPI = async (postData) => apiClient('/posts', { method: 'POST', body: postData });
export const getPostAPI = async (id) => apiClient(`/posts/${id}`, { method: 'GET' });
export const updatePostAPI = async (id, postData) => apiClient(`/posts/${id}`, { method: 'PUT', body: postData });
export const deletePostAPI = async (id) => apiClient(`/posts/${id}`, { method: 'DELETE' });

export const markAttendanceAPI = async (attendanceData) => apiClient('/attendances', { method: 'POST', body: attendanceData });
export const listAttendanceByStudentAPI = async (studentId) => apiClient(`/attendances/aluno/${studentId}`, { method: 'GET' });
export const listAttendanceByDateAPI = async (date) => apiClient(`/attendances/data/${date}`, { method: 'GET' });
