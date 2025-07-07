import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustand/conversation";
import notification from "../assets/sound/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      const exists = messages.find((msg) => msg._id === newMessage._id);
      if (exists) return; // ✅ prevent duplicates

      newMessage.shouldshake = true;

      try {
        const notifySound = new Audio(notification);
        notifySound.play();
      } catch (err) {
        console.error("Sound error:", err);
      }

      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
