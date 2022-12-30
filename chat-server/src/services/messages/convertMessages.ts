import mockMessages from '../../data/mockMessages';
import mockUserDetails from '../../data/mockUserDetails';

export default function addUsersNamesToMsgs() {
    const newMsgsList = mockMessages.map((msg) => {
        const name = mockUserDetails.find(user => msg.authorId === user.id).name;
        return {...msg, authorName: name };
    });
    return newMsgsList;
}

