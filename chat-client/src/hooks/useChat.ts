import { useEffect, useState } from "react";
import { Message } from '../types/message';
import { User } from '../types/user';
import { addNewMessage, changeMessageLikes, getMessages, getUserDetails, getUsers } from './server-requests';

export function useChat() {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    getUsers().then(userList => {
      setUsers(userList);
      setCurrentUser(userList[0]);
    });

    getMessages().then(messageList => {
      setMessages(messageList);
    });
  }, []);

  const [selectedAuthor, setSelectedAuthor] = useState<User | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showMessageDetails, setShowMessageDetails] = useState<boolean>(false);

  const selectUser = (id: string) => {
    const foundUser = users.find(user => user.id === +id);
    foundUser && setCurrentUser(foundUser);
  };

  const addMessage = async (event: any) => {
    if (event.key === 'Enter' && event.target.value) {
      const newMessage = {
        id: messages.length + 1, 
        timestamp: new Date(),
        body: event.target.value,
        authorId: currentUser!.id,
      };
      
      setMessages([
        ...messages,
        {
          ...newMessage,
          likes: [],
          authorName: currentUser!.name,
          status: 'pending'
        }
      ]);

      const messageToServerStatus = await addNewMessage(newMessage);
      
      setMessages([
          ...messages, {
            ...newMessage,
            likes: [],
            authorName: currentUser!.name,
            status: messageToServerStatus? 'ok': 'pending'
          }
        ]);
      return;
    }
  };

  const toggleLike = async (message: Message) => {
    const userLiked = message.likes!.indexOf(currentUser!.id);
    userLiked === -1 ? message.likes!.push(currentUser!.id) : message.likes!.splice(userLiked, 1);
    setSelectedMessage({ ...message });

    // todo: change the likes in the server
    await changeMessageLikes(message.id, currentUser!.id, userLiked !== -1);
  };

  const openAuthorDetails = async (author: User) => {
    setSelectedAuthor(author);
    setSelectedAuthor(await getUserDetails(author.id) || null);
  };

  return {
    messages,
    users,
    currentUser,
    selectedAuthor,
    selectedMessage,
    showMessageDetails,
    setSelectedAuthor,
    setSelectedMessage,
    setShowMessageDetails,
    openAuthorDetails,
    selectUser,
    addMessage,
    toggleLike,
  }
}