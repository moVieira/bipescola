import * as postModel from "../models/postModel.js";

export async function createPost(data) {
  return await postModel.createPost(data);
}

export async function getPosts() {
  return await postModel.findAll();
}

export async function getPostById(id) {
  return await postModel.findById(id);
}

export async function updatePost(id, data) {
  return await postModel.updatePost(id, data);
}

export async function deletePost(id) {
  return await postModel.deletePost(id);
}
