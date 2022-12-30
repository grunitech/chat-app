import { Message } from '../types/message';
import { mockUsers } from '../assets/mockUsers'; // todo: remove this line after server implementation

const endpoint = '../assets/' // todo: add endpoint (server) address (starting with http://)

const url = 'http://localhost:4000';
/**
 * GET Request to get the list of messages
 **/
export async function getMessages(): Promise<Object[]> {
  const response = await fetch(`${url}/messages`);
  const messageWithNames = await response.json();
  return messageWithNames;
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers() {
  const response = await fetch(`${url}/users`);
  const usersIdsNamesOnly = await response.json();
  return usersIdsNamesOnly;
}


/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {
  // todo: replace this with fetch to get the user details from the server.
  //  For mocking example, we're calling an external JSON service.
  //  You can use mockUserDetails.ts for the list of user details in the server.
  const res = await fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`);
  return (await res.json())[0];
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
  // todo: implement sending a new message to the server
}

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(messageId: number, userId: number, like: boolean) {
  // todo: implement sending a rquest to change the like of a message by the user
}