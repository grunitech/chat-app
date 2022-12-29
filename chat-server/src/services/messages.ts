import { Router, Request, Response } from 'express';
import mockMessages from '../data/mockMessages';
import mockUserDetails from '../data/mockUserDetails';


function findUserNameById(userId: number): string {
    for(let i=0; i<mockUserDetails.length; i++) {
        const {id, name} = mockUserDetails[i];
        if(id === userId) return name;
    };
}

function addUsersNamesToMsgs(): {}[] {
    const newMsgsList = mockMessages.map((msg) => {
        const name = findUserNameById(msg.authorId);
        return {...msg, authorName: name };
    });
    return newMsgsList;
}

export const messages = Router();

messages.get('/',(req: Request, res: Response) => {
    res.send(addUsersNamesToMsgs());
});

export default messages;




