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
        id: messages.length + 1, // in reality, id should be added by the server
        timestamp: new Date(),
        body: event.target.value,
        authorId: currentUser!.id,
      };

      // first create and render the message with status 'pending'.
      setMessages([...messages, {
                                  ...newMessage,
                                  likes: [],
                                  status: 'pending'
                                }
                ]);
      
      // then send request to server and expect status 'ok' and author's name.
      const messageFromServer = await addNewMessage(newMessage);
      // render the messages to see 'v'.
      // this action might be costly if theres a lot of messages.....
      setMessages([...messages, messageFromServer]);
      
    }
  };

  const toggleLike = async (message: Message) => {
    const userLiked = message.likes!.indexOf(currentUser!.id);
    userLiked === -1 ? message.likes!.push(currentUser!.id) : message.likes!.splice(userLiked, 1);
    

    await changeMessageLikes(message.id, currentUser!.id, userLiked !== -1);

    // render only after update happens in the server...
    setSelectedMessage({ ...message });
    
  };

  const openAuthorDetails = async (author: User) => {
    setSelectedAuthor(author); // name and id only
    setSelectedAuthor(await getUserDetails(author.id) || null);
    // todo: get user details from the server
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