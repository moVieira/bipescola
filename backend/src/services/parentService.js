import bcrypt from "bcrypt";
import * as userModel from "../models/userModel.js";

export async function createParent(data) {
    return await createUser({
        nome,
        email
    })
}