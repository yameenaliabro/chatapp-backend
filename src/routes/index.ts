import express from "express";
import { deleteUser, editUser, getAllUsers, getUserById, login, signUp } from "../controllers/user";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.get("/users", getAllUsers);
userRoutes.get("/user", getUserById);
userRoutes.post("/signup", signUp);
userRoutes.patch("/edit", editUser);
userRoutes.delete("/delete/:user_id", deleteUser);

export default userRoutes;
