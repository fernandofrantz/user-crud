import { database } from "../config/database";
import { Request, Response } from "express";

export const createUser = async ( req: Request, res: Response ) => {
    const requisitionData = await req.body;

    database.push(requisitionData);

    return res.status(200).json(requisitionData);
};


export const getUsers = async (req: Request, res: Response) => {
    return res.status(200).json(database);
}