import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext.jsx";
const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketProvider = ({ children }) => {
  const { authUser } = useAuthContext();

  const [socket, setSocket] = useState(null);
  const [userOnline, setUserOnline] = useState([]);

  useEffect(() => {
    if (authUser) {
      const socket = io("https://devchats-mokshithrd-44up.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      socket.on("connect", () => {
  
});

socket.on("disconnect", () => {
 
});

      socket.on("getOnlineUsers", (users) => {
        setUserOnline(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, userOnline }}>
      {children}
    </SocketContext.Provider>
  );
};
