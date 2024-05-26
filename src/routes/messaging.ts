import express from 'express';
import { geAllMessages, getMessages } from '../controllers/messaging';

const messageRoutes = express.Router();

messageRoutes.get('/user/messages', getMessages);
messageRoutes.get('/messages', geAllMessages);


export default messageRoutes;
