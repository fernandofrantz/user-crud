import express from "express";
import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../models/userSchema";

const route = Router();

export const userRoutes = (app: express.Application) => {
  route.post("/register", validateSchema(userSchema));
};
