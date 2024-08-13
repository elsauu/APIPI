// server.js

import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socket/socket.js";
import job from "./cron/cron.js";
import cors from "cors"; // Importar cors

dotenv.config();

connectDB();
job.start();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// **Configuración de CORS**
app.use(cors({
	origin: ["http://localhost:3000", "https://c6b7-2806-2f0-4521-fc5a-fc60-684a-e834-ba46.ngrok-free.app"], // Permitir solicitudes desde ambos orígenes
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	credentials: true // Permitir el envío de cookies si es necesario
}));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

// Servir archivos estáticos en producción
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

server.listen(PORT, () => {
	const host = process.env.HOST || `http://localhost:${PORT}`;
	console.log(`Server started at ${host}`);
});
