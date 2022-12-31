import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import addUsersNamesToMsgs from './convertMessages';
import mockUserDetails from '../../data/mockUserDetails';
import {mockMessages, Message} from '../../data/mockMessages';

export const messages = Router();

messages.get('/',(req: Request, res: Response) => {
    const messagesListWithNames: Message[] = addUsersNamesToMsgs();
    res.send(messagesListWithNames);
});

messages.post('/new-message', bodyParser.json(), (req: Request, res: Response) => {
    const newMessage: Message = req.body;
    newMessage.likes = [];
    newMessage.authorName = mockUserDetails.find(user => newMessage.authorId === user.id).name;
    mockMessages.push(newMessage);
    res.sendStatus(200);
});

messages.post('/like', bodyParser.json(), (req: Request, res: Response) => {
    const {messageId, userId, like} = req.body;
    const messageObject: Message = mockMessages.find(message => message.id === Number(messageId));
    if(like) {
        messageObject.likes.push(Number(userId));
    }
    else {
        messageObject.likes = messageObject.likes.filter(id => id !== Number(userId));
    }
    res.sendStatus(200);
});

export default messages;




