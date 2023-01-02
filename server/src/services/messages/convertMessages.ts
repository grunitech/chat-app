import {Message, mockMessages} from '../../data/mockMessages';
import mockUserDetails from '../../data/mockUserDetails';

export default function addUsersNamesToMsgs(): Message[] {
    const newMsgsList: Message[] = mockMessages.map((msg) => {
        const name: string = mockUserDetails.find(user => msg.authorId === user.id).name;
        return {...msg, authorName: name };
    });
    return newMsgsList;
}

