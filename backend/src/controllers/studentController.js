import { prisma } from "../database/prisma.js";

export async function listStudents(req, res) {
  try {
    const alunos = await prisma.alunos.findMany();

    return res.status(200).json(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);

    return res.status(500).json({
      error: "Erro ao buscar alunos"
    });
  }
}