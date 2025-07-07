import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";

const NotificationIcon = () => {
  const { authUser } = useAuthContext();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!authUser?._id || !authUser?.token) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/messages/unread-count/${authUser._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authUser.token}`,
            },
            credentials: "include", 
          }
        );

        if (!res.ok) throw new Error("Unauthorized or failed to fetch");

        const data = await res.json();
        setCount(data.count || 0);
      } catch (err) {
        console.error("Error fetching unread count:", err);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 5000);
    return () => clearInterval(interval);
  }, [authUser]);

  return (
    <div className="relative">
      <FaBell size={24} className="text-gray-700" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
