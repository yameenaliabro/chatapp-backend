import express from "express";
import { handleError } from "../util";
import { addMessageModel, getAllMessagesModel, getMessagesModel } from "../models/messaging";

// Add a message
export const addMessage = async (req: express.Request, res: express.Response) => {
    const { sender_id, recipient_id, text, image, uploadimage } = req.body;
    try {
        const message = await addMessageModel({ sender_id, recipient_id, text, image, uploadimage });
        res.status(200).send({ message: "Message added successfully", result: message });
    } catch (error) {
        handleError(error, res);
    }
};

// Get messages between two users
export const getMessages = async (req: express.Request, res: express.Response) => {
    const { userId, otherUserId } = req.query;
    try {
        const messages = await getMessagesModel(userId as string, otherUserId as string);
        res.status(200).json({ message: "Messages retrieved successfully", result: messages });
    } catch (error) {
        handleError(error, res);
    }
};

export const geAllMessages = async (req: express.Request, res: express.Response) => {
    try {
        const response = await getAllMessagesModel();
        res.status(200).json({ message: "All Messages retrieved successfully", result: response });
    } catch (error) {
        handleError(error, res);
    }
}