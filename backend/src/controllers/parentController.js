import * as parentService from "../services/parentService.js";

export async function createParent(req, res) {
  try {
    const { nome, email } = req.body;

    const result = await parentService.createParent({ nome, email });

    return res.status(201).json({
      message: "Parent criado com sucesso",
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}