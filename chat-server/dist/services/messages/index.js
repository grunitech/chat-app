import { Router } from 'express';
import bodyParser from 'body-parser';
import addUsersNamesToMsgs from './convertMessages';
import mockUserDetails from '../../data/mockUserDetails';
import mockMessages from 'data/mockMessages';
export const messages = Router();
messages.get('/', (req, res) => {
    const messagesListWithNames = addUsersNamesToMsgs();
    res.send(messagesListWithNames);
});
messages.post('/', bodyParser.json(), (req, res) => {
    const newMessage = req.body;
    newMessage.likes = [];
    newMessage.authorName = mockUserDetails.find(user => newMessage.authorId === user.id).name;
    mockMessages.push(newMessage);
    res.sendStatus(200);
});
export default messages;
