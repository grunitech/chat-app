import { Message } from '../types/message';
import { mockUsers } from '../assets/mockUsers'; // todo: remove this line after server implementation
import { User } from '../types/user';

const endpoint = 'http://localhost:5000';

/**
 * GET Request to get the list of messages
 **/
export async function getMessages() {

  // MY IMPLEMENTATION
  const mockMessages = await fetch(`${endpoint}/mockMessages`)
    .then((response) => response.json());
  return mockMessages;
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers() {

  // MY IMPLEMENTATION
  const mockUsers = await fetch(`${endpoint}/mockUsers`)
  .then((response) => response.json());
  return mockUsers;
}


/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {

// MY IMPLEMENTATION
  const response = await fetch(`${endpoint}/users?id=${userId}`);
  const user: User = await response.json();

 return user;

};

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message) {
  const response = await fetch(`${endpoint}/newmessage`, {
                                                                method: 'POST',
                                                                headers: {'Content-Type': 'application/json'},
                                                                body: JSON.stringify({...message}),
                                                                   });
  const newMessage = await response.json();
  return newMessage;
};

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(messageId: number, userId: number, like: boolean) {
  const response = await fetch(`${endpoint}/like`, {
                                                          method: 'POST',
                                                          headers: {'Content-Type': 'application/json'},
                                                          body: JSON.stringify({messageId: messageId,
                                                                                        userId: userId,
                                                                                        like: like}),
                                                                                        });
  const updatedMesssage = await response.json();
  console.log(updatedMesssage)
  return updatedMesssage;
};