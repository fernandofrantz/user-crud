import { database } from "../config/database";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const config = {
  secretKey: "the_greatest_secret_key",
  expiresIn: "604800",
};

export const createUser = async (req: Request, res: Response) => {
  const requisitionData = await req.body;
  const hashedPassword = await bcrypt.hash(requisitionData.password, 5);

  requisitionData.password = hashedPassword;

  const userToInsert = {
    id: uuidv4(),
    ...requisitionData,
    createdAt: new Date().toLocaleString(),
    dataField: [],
  };

  database.push(userToInsert);

  return res.status(200).json(userToInsert);
};

export const getUsers = async (req: Request, res: Response) => {
  return res.status(200).json(database);
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const filterUsers = database.filter((user) => user.id === userId);

  if (!filterUsers) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(filterUsers);
};

export const getUser = async (req: Request, res: Response) => {};

export const updateUsers = async (req: Request, res: Response) => {};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const findUser = database.find((user) => user.email === email);

  if (!findUser) {
    return res.status(401).json({ message: "Wrong credentials." });
  }

  const match = await bcrypt.compare(password, findUser.password);

  if (!match) {
    return res.status(401).json({ message: "Wrong credentials." });
  }

  const token = jwt.sign(
    {
      email: email,
    },
    config.secretKey,
    {
      expiresIn: config.expiresIn,
    }
  );

  return res.status(200).json({ token: token });
};
