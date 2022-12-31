import { Router } from 'express';
import { convertUsersToNameIdOnly } from './convertUsers';
import { mockUserDetails } from '../../data/mockUserDetails';
export const users = Router();
users.get('/', (req, res) => {
    const usersWithNamesIdsOnly = convertUsersToNameIdOnly();
    res.send(usersWithNamesIdsOnly);
});
users.get('/:id', (req, res) => {
    const id = req.params.id;
    const userById = mockUserDetails.find(user => user.id === Number(id));
    if (userById) {
        res.send(userById);
    }
    else {
        res.send('User Not Exist');
    }
});
export default users;
