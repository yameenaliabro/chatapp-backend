import pool from "../db";
import { MessageProps } from "../types/messages";
import { addMessageQuery, getAllMessagesQuery, getMessagesQuery } from "../util/queries/messages";


export const addMessageModel = async (message: MessageProps) => {
    const { sender_id, recipient_id, text, image, uploadimage } = message;
    const response = await pool.query(addMessageQuery,
        [sender_id, recipient_id, text, image, uploadimage]
    );
    return response.rows[0];
};

export const getMessagesModel = async (userId: string, otherUserId: string) => {
    const response = await pool.query(getMessagesQuery,
        [userId, otherUserId]
    );
    return response.rows;
};

export const getAllMessagesModel = async () => {
    try {
        const response = await pool.query(getAllMessagesQuery)
        return response.rows;
    } catch (error) {
        throw error
    }
}
