import * as attendanceModel from "../models/attendanceModel.js";

export async function markAttendance(data) {
  return await attendanceModel.createAttendance(data);
}

export async function getAttendanceByStudent(aluno_id) {
  return await attendanceModel.findByStudentId(aluno_id);
}

export async function getAttendanceByDate(data) {
  return await attendanceModel.findByDate(data);
}

export async function getAttendanceById(id) {
  return await attendanceModel.findById(id);
}

export async function updateAttendance(id, data) {
  return await attendanceModel.updateAttendance(id, data);
}

export async function deleteAttendance(id) {
  return await attendanceModel.deleteAttendance(id);
}