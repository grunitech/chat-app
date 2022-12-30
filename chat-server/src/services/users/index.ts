import { Router, Request, Response } from 'express';
import {convertUsersToNameIdOnly} from './usersLogic';

export const users = Router();

users.get('/',(req: Request, res: Response) => {
    const usersWithNamesIdsOnly = convertUsersToNameIdOnly();
    res.send(usersWithNamesIdsOnly);
});

export default users;