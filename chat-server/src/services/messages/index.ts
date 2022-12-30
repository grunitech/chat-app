import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import addUsersNamesToMsgs from './convertMessages';

export const messages = Router();

messages.get('/',(req: Request, res: Response) => {
    const messagesListWithNames = addUsersNamesToMsgs();
    res.send(messagesListWithNames);
});

messages.put('/', bodyParser.json(), (req: Request, res: Response) => {
    const newMessage = req.body;
    newMessage.likes = [];
    newMessage.authorName = '';
});


export default messages;




