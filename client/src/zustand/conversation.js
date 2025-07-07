import { create } from "zustand";

const useConversation = create((set) => ({
  selectedconversation: "",
  setconversition: (selectedconversation) => set({ selectedconversation }),
  messages: [],
  setMessages: (update) =>
    set((state) => ({
      messages: typeof update === "function" ? update(state.messages) : update,
    })),
}));

export default useConversation;
