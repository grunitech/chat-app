import { mockUserDetails } from "../../data/mockUserDetails";
export function convertUsersToNameIdOnly() {
    const newUsersList = mockUserDetails.map((user) => {
        return { id: user.id, name: user.name };
    });
    return newUsersList;
}
