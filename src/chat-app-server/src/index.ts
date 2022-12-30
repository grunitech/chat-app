///////////////// technical imports /////////////////
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser, { urlencoded } from 'body-parser';
import {resolve } from 'node:path';

///////////////// "data base" & interfaces /////////////////

import { mockMessages } from './assets/mockMessages';
import { mockUserDetails } from './assets/mockUserDetails';
import { User } from "./types/user";
import { Message } from "./types/message"

///////////////////// handlers //////////////////////////

import { getuser } from './handlersAndFunctions';


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/mockMessages', (req: Request, res: Response) => {
    const mockMessagesWithNames = mockMessages.map((message: Message) => {
    const author = mockUserDetails.find(user => user.id === message.authorId);
    const authorName = author && author.name;
        return { ...message, authorName };
      });
    return res.json(mockMessagesWithNames);

})

app.get('/mockUsers', (req: Request, res: Response) => {
    return res.json(mockUserDetails)
})

// this method respond to getUserDetails
app.get('/users', (req: Request, res: Response) => {
    const userId = req.query.id;
    for (let user of mockUserDetails) {
        if (user.id === +userId) return res.json(user);}
})

// this method respond to new message requests
app.post('/newmessage', (req: Request, res: Response) => {
    const userId = req.body.authorId;
    let authorName: string;
    for (let user of mockUserDetails) {
        if (user.id === +userId) {
            authorName = user.name;
        };
    };
    const newMessage = {...req.body,
                        authorName,
                        likes:[],
                        status: 'ok',            
    }
    mockMessages.push(newMessage)
    return res.json(newMessage)
});


// this method responds to likes
app.post('/like',(req: Request, res: Response) => {
    const meassgeToUpdateId = +(req.body.messageId);
    const currentUserId = +(req.body.userId);
    const likeBoolean = req.body.like;

    console.log(req.body)
    let messageToUpdate: Message;

    for (let message of mockMessages) {
        if (meassgeToUpdateId === message.id) {
            messageToUpdate = message;
        };
    };

    console.log(messageToUpdate.likes);
    console.log(messageToUpdate.likes.includes(currentUserId))
    const userLiked = messageToUpdate.likes!.indexOf(currentUserId);
    userLiked === -1 ? messageToUpdate.likes!.push(currentUserId) : messageToUpdate.likes!.splice(userLiked, 1);
    return res.json(messageToUpdate);
});




app.listen(5000, '0.0.0.0', () => {
    console.log('Server is running at port 5000');
});