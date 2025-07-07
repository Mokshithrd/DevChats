// useUnreadCounts.js
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useUnreadCounts = () => {
  const { authUser } = useAuthContext();
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      if (!authUser?._id) return;

      try {
        const res = await fetch(`http://localhost:5000/api/messages/unread-counts/${authUser._id}`);
        const data = await res.json();

        const countMap = {};
        data.forEach((item) => {
          countMap[item._id] = item.count;
        });

        setCounts(countMap);
      } catch (err) {
        console.error("Failed to fetch unread counts", err);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 5000); 
    return () => clearInterval(interval);
  }, [authUser]);

  return counts;
};

export default useUnreadCounts;
