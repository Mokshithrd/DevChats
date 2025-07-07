
import { create } from "zustand";

const useNotification = create((set) => ({
  notifications: {}, 

  incrementNotification: (userId) =>
    set((state) => ({
      notifications: {
        ...state.notifications,
        [userId]: (state.notifications[userId] || 0) + 1,
      },
    })),

  resetNotification: (userId) =>
    set((state) => {
      const newNotifications = { ...state.notifications };
      delete newNotifications[userId];
      return { notifications: newNotifications };
    }),
}));

export default useNotification;