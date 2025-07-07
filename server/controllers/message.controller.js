import conversation from "../models/conversations.model.js";
import Message from "../models/messages.model.js";
import { getReciverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    let Conversation = await conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });
    if (!Conversation) {
      Conversation = await conversation.create({
        participants: [senderId, recieverId],
      });
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      message,
      isRead: false,
    });
    if (newMessage) {
      Conversation.messages.push(newMessage._id);
    }
    await Promise.all([Conversation.save(), newMessage.save()]);
    //Realtime messages Functionality Here
    const recieverSocketId = getReciverSocketId(recieverId);
    console.log("Receiver socket ID:", recieverSocketId);
    if (recieverSocketId) {
      console.log("Receiver online, sending real-time message");
      io.to(recieverSocketId).emit("newNotification", { senderId, messageId: newMessage._id });
      io.to(recieverSocketId).emit("newMessage", newMessage);
    } else {
      console.log(" Receiver not online, skipping socket emit");
    }

    res.send(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error while sending msg" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    let Conversation = await conversation
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate("messages");
    if (!Conversation) {
      return res.status(200).json([]);
    }
    res.status(200).json(Conversation.messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error while fetching msg" });
  }
};


export const getUnreadCount = async (req, res) => {
  try {
    const receiverId = req.params.userId;

    const unreadCounts = await Message.aggregate([
      { $match: { receiver: receiverId, read: false } },
      {
        $group: {
          _id: "$sender",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(unreadCounts); // returns: [{ _id: senderId, count: 2 }, ...]
  } catch (err) {
    res.status(500).json({ error: "Error fetching unread counts" });
  }
};


export const markAsRead = async (req, res) => {
  try {
    const senderId = req.params.senderId;
    const receiverId = req.user._id;

    await Message.updateMany(
      { senderId, recieverId: receiverId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error marking messages as read:", error);
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
};
