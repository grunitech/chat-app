import {Message} from '../types/message';
import {User} from '../types/user';

const url: string = 'http://localhost:2005';

/**
 * GET Request to get the list of messages
 **/
export async function getMessages(): Promise<Message[]> {
  const response: Response = await fetch(`${url}/messages`);
  const messageWithNames: Message[] = await response.json();
  return messageWithNames;
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers(): Promise<User[]> {
  const response: Response = await fetch(`${url}/users`);
  const usersIdsNamesOnly: User[] = await response.json();
  return usersIdsNamesOnly;
}

/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number): Promise<User> {
  const response: Response = await fetch(`${url}/users/${userId}`);
  const userDetails: User = await response.json();
  return userDetails;
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message): Promise<boolean> {
  const response: Response = await fetch(`${url}/messages/new-message`, {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.status === 200) return true;
  return false;
};

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(messageId: number, userId: number, like: boolean): Promise<boolean> {
  const likeDeatils: Object = {messageId, userId, like};
  const response: Response = await fetch(`${url}/messages/like`, {
    method: 'POST',
    body: JSON.stringify(likeDeatils),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.status === 200) return true;
  return false;
}