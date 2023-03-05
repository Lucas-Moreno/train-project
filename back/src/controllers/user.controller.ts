import { Request, Response } from 'express'

export const getInfoUser = async (req: Request, res: Response) => {
  let user = req.user;
  res.send(JSON.stringify(user));
};
