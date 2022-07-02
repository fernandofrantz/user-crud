import express from "express";
import { Router } from "express";
import { createUser, getUserById, getUsers, login } from "../controllers/userController";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../models/userSchema";

const route = Router();

export const userRoutes = (app: express.Application) => {
  route.post("/register", createUser);

  route.get("/", getUsers);

  route.get("/:id", getUserById);

  route.post("/login", login);

  app.use("/users", route);
};
