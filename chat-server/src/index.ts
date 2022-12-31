import express from 'express';
import cors from 'cors';
import {messages} from './services/messages';
import {users} from './services/users';

const app = express();

app.use(cors());

app.use('/messages', messages);

app.use('/users', users);

app.listen(2005, '0.0.0.0', () => {
    console.log('Server is running');
});




