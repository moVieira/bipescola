import * as studentModel from "../models/studentModel.js";

export async function getStudents() {
  return await studentModel.findAll();
}

export async function getStudentById(id) {
  return await studentModel.findById(id);
}

export async function getStudentsByParentId(parentId) {
  return await studentModel.findByParentId(parentId);
}

export async function getStudentsByTurmaId(turmaId) {
  return await studentModel.findByTurmaId(turmaId);
}

export async function createStudent(data) {
  return await studentModel.create(data);
}

export async function updateStudent(id, data) {
  return await studentModel.updateById(id, data);
}

export async function deleteStudent(id) {
  return await studentModel.deleteById(id);
}
