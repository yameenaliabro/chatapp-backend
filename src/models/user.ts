import pool from "../db"
import { userProps } from "../types/user"
import { signupQuery, deleteUserQuery, getAllUsersQuery, getUserByIdQuery, loginQuery } from "../util/queries/user"
import bcrypt from "bcrypt";

export const signUpModel = async (user: userProps) => {
    const { email, password, retypepassword, username, contactNumber, description, image, skill, friend } = user
    const hashedPassoword = await bcrypt.hash(password, 10);
    const retypepasswordhashed = await bcrypt.hash(retypepassword, 10)
    try {
        const response = await pool.query(signupQuery, [
            username,
            email,
            hashedPassoword,
            retypepasswordhashed,
            description,
            skill,
            contactNumber,
            image,
            friend
        ])
        return response.rows[0];
    } catch (error) {
        throw error
    }
}

export const loginModel = async (username: string) => {
    try {
        const user = await pool.query(loginQuery, [username]);
        return user.rows[0];
    } catch (error) {
        throw error;
    }
}

export const getAllUsersModel = async () => {
    const res = await pool.query(getAllUsersQuery);
    return res.rows;
};


export const getUserByIdModel = async (user_id: string) => {
    const res = await pool.query(getUserByIdQuery, [user_id]);
    return res.rows[0];
};


export const editUserModel = async (userId: string, userData: Partial<userProps>) => {
    const fields = Object.keys(userData);
    const values = Object.values(userData);
    // Dynamically construct the SQL query
    let query = 'UPDATE users SET ';
    const setClauses = fields.map((field, index) => `${field} = $${index + 1}`);
    query += setClauses.join(', ');
    query += ` WHERE user_id = $${fields.length + 1} RETURNING *`;

    const res = await pool.query(query, [...values, userId]);
    return res.rows[0];
};

export const deleteUserModel = async (user_id: string) => {
    const response = await pool.query(deleteUserQuery, [user_id])
    return response.rows[0];
};


