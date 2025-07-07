import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext"; 

const useGetConversation = () => {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]);

useEffect(() => {
  const getCoversations = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      setConversation(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  getCoversations();
}, [authUser]);

  return { loading, conversation }; 
};

export default useGetConversation;
