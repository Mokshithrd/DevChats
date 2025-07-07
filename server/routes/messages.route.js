import express from "express";
import { getMessages, sendMessage, getUnreadCount } from "../controllers/message.controller.js";
import authRoute from "../middleware/auth.js";
import { markAsRead } from "../controllers/message.controller.js";

const router = express.Router();
router.patch("/mark-read/:senderId", authRoute, markAsRead);
router.get('/unread-counts/:userId', getUnreadCount);
router.get("/:id", authRoute, getMessages);
router.post("/send/:id", authRoute, sendMessage);
export default router;
