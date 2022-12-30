import { Router } from 'express';
import addUsersNamesToMsgs from './convertMessages';
export const messages = Router();
messages.get('/', (req, res) => {
    const messagesListWithNames = addUsersNamesToMsgs();
    res.send(messagesListWithNames);
});
export default messages;
