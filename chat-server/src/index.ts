import express from 'express';
import cors from 'cors';
import {messages} from './services/messages';

const app = express();

app.use(cors());

app.use('/messages', messages);

app.listen(4000, '0.0.0.0', () => {
    console.log('Server is running');
});


