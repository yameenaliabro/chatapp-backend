
import express from "express";
import { handleError } from "../util";
import { deleteUserModel, editUserModel, getAllUsersModel, getUserByIdModel, loginModel, signUpModel } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { jwt_key } from "../config";
import { contactNumber, description, image, skill, friend } from "../util/metaData/index"
import { GetUserByIdQuery } from "../types/user";

// Sign Up User
export const signUp = async (req: express.Request, res: express.Response) => {
    const { username, email, password, retypepassword } = req.body
    try {
        // Add Some Met Data
        const response = await signUpModel({ email, password, retypepassword, username, contactNumber, description, image, skill, friend })
        res.status(200).send({ message: "User signUp Sucessfully", result: response })
    } catch (error) {
        handleError(error, res)
    }
}

// Login User
export const login = async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    try {
        const user = await loginModel(username);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, jwt_key as string, { expiresIn: '1h' });
        res.status(200).json({ message: "User logged in successfully", result: { token: token, user: user } });
    } catch (error) {
        handleError(error, res);
    }
};


export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getAllUsersModel();
        res.status(200).json({ message: "Users retrieved successfully", result: users });
    } catch (error) {
        handleError(error, res);
    }
};


// Get User By ID
export const getUserById = async (req: express.Request<{}, {}, {}, GetUserByIdQuery>, res: express.Response) => {
    const { user_id } = req.query;
    try {
        const user = await getUserByIdModel(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User retrieved successfully", result: user });
    } catch (error) {
        handleError(error, res);
    }
};


// Edit User
export const editUser = async (req: express.Request<{}, {}, {}, GetUserByIdQuery>, res: express.Response) => {
    const { user_id } = req.query;
    const userData = req.body;
    try {
        const updatedUser = await editUserModel(user_id, userData);
        res.status(200).json({ message: "User updated successfully", result: updatedUser });
    } catch (error) {
        handleError(error, res);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    const { user_id } = req.params;
    try {
        const response = await deleteUserModel(user_id);
        res.status(200).json({ message: "User deleted successfully", result: response });
    } catch (error) {
        handleError(error, res);
    }
};