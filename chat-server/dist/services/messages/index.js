import { Router } from 'express';
import bodyParser from 'body-parser';
import addUsersNamesToMsgs from './convertMessages';
export const messages = Router();
messages.get('/', (req, res) => {
    const messagesListWithNames = addUsersNamesToMsgs();
    res.send(messagesListWithNames);
});
messages.put('/', bodyParser.json(), (req, res) => {
    const newMessage = req.body;
    newMessage.likes = [];
    newMessage.authorName = '';
});
export default messages;
