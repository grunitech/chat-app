import { Message } from '../types/message';
// import { mockUsers } from '../assets/mockUsers'; // todo: remove this line after server implementation

const endpoint = 'http://localhost:3001'; // todo: add endpoint (server) address (starting with http://)
const mockUsers = await getUsers();

/**
 * GET Request to get the list of messages
 * -->DONE<--
 **/

export async function getMessages() {
  // todo: replace this with fetch to get the messages from the server
  const mockMsgPromise = await fetch(`${endpoint}/messages`);
  const  mockMessages  = await mockMsgPromise.json();
  // const { mockMessages } = await import(`${endpoint}/mockMessages`);

  // todo: this should be implemented in the server. Chat Messages should already have the authors' names.
  // todo: remove this mapping when getting the data from the server
  const mockMessagesWithNames = mockMessages.map((message: Message) => {
    const author = mockUsers.find((user: { id: number; }) => user.id === message.authorId);
    const authorName = author && author.name;
    return { ...message, authorName };
  });

  return mockMessagesWithNames;
}

/**
 * GET request to get the full list of users - id + name
 * -->DONE<--
 **/
export async function getUsers() {
  // todo: replace this with fetch to get the user list from the server
  const mockUsers  = await fetch (`${endpoint}/users`);
  return (await mockUsers.json()) ;
}


/**
 * GET request to get the full details of a user
 * -->DONE<--
 **/
export async function getUserDetails(userId: number) {
  // todo: replace this with fetch to get the user details from the server.
  //  For mocking example, we're calling an external JSON service.
  //  You can use mockUserDetails.ts for the list of user details in the server.
  const res = await fetch(`${endpoint}/userdetails/${userId}`);
  console.log(res)
  return (await res.json())[0];
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
  // todo: implement sending a new message to the server
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  };
  const res = await fetch(`${endpoint}/messages`, requestOptions)
  return (await res.json());

}

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(messageId: number, userId: number, like: boolean) {
  // todo: implement sending a rquest to change the like of a message by the user
}