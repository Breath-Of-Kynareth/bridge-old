import { Request, Response } from 'express';

export function auth(req: Request, res: Response): void {
    res.json({ message: 'You are authorized.' });
  }