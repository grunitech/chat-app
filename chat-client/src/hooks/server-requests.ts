import { Message } from '../types/message';

const url = 'http://localhost:3000';

/**
 * GET Request to get the list of messages
 **/
export async function getMessages() {
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
  const response = await fetch(`${url}/users/${userId}`);
  const userDetails = await response.json();
  return userDetails;
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
  const response = await fetch(`${url}/messages/new-message`, {
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
export async function changeMessageLikes(messageId: number, userId: number, like: boolean) {
  const likeDeatils = {messageId, userId, like};
  const response = await fetch(`${url}/messages/like`, {
    method: 'POST',
    body: JSON.stringify(likeDeatils),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.status === 200) return true;
  return false;
}