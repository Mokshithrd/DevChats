import path from "path";
import express from "express";
import * as dotenv from "dotenv";
import authroutes from "./routes/auth.route.js";
import connectdb from "./Database/mongoDBconnect.js";
import messagesroutes from "./routes/messages.route.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import { app, server } from "./socket/socket.js";
import cors from "cors";


dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authroutes);
app.use("/api/messages", messagesroutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Welcome to home of API");
});


const startServer = async () => {
  try {
    await connectdb(); 
    server.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect DB:", err.message);
    process.exit(1); 
  }
};

startServer();
