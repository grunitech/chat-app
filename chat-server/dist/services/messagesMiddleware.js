import mockMessages from '../data/mockMessages';
import mockUserDetails from '../data/mockUserDetails';
function findUserNameById(userId) {
    for (let i = 0; i < mockUserDetails.length; i++) {
        const { id, name } = mockUserDetails[i];
        if (id === userId)
            return name;
    }
    ;
}
function addUsersNamesToMsgs() {
    const newMsgsList = mockMessages.map((msg) => {
        const name = findUserNameById(msg.authorId);
        return { ...msg, authorName: name };
    });
    return newMsgsList;
}
const newMsgsList = addUsersNamesToMsgs();
export default newMsgsList;