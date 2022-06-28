import { Request, Response, NextFunction } from "express";

export const validateSchema =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    const recieved_data = req.body;

    try {
      await schema.validate(recieved_data);
      next();
    } catch (exception: any) {
      return res.status(400).json({
        error: exception.errors.join(","),
      });
    }
  };
