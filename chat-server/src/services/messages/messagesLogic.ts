import mockMessages from '../../data/mockMessages';
import mockUserDetails from '../../data/mockUserDetails';

function findUserNameById(userId: number): string {
    for(let i=0; i<mockUserDetails.length; i++) {
        const {id, name} = mockUserDetails[i];
        if(id === userId) return name;
    };
}

export function addUsersNamesToMsgs() {
    const newMsgsList = mockMessages.map((msg) => {
        const name = findUserNameById(msg.authorId);
        return {...msg, authorName: name };
    });
    return newMsgsList;
}

