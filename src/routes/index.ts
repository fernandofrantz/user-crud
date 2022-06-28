import express from "express";

export const routes = (app: express.Application) => {
  app.use(express.json());
  // userRoutes( app );
};
