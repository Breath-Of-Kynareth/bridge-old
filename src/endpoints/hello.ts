import { Request, Response } from 'express';

export function sayHello(req: Request, res: Response): void {
  res.json({ message: 'Hello, World!' });
}