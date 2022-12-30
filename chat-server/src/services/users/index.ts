import { Router, Request, Response } from 'express';
import {convertUsersToNameIdOnly} from './usersLogic';
import mockUserDetails from '../../data/mockUserDetails';

export const users = Router();

users.get('/', (req: Request, res: Response) => {
    const usersWithNamesIdsOnly = convertUsersToNameIdOnly();
    res.send(usersWithNamesIdsOnly); 
});


users.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const userById = mockUserDetails.find(user => user.id === Number(id));
    if(userById) {
        res.send(userById);
    }
    else {
        res.send('User Not Exist');
    }
});

export default users;