import express from "express";
import { userRoutes } from "./userRoutes";

export const routes = (app: express.Application) => {
  app.use(express.json());
  userRoutes( app );
};
