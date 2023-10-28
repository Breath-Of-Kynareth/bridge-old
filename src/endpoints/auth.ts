import { Request, Response } from 'express';
import { perms } from '../auth/perms';
import { config } from '../config/config';
import { mongoService } from '../services/mongoService';

export async function auth(req: Request, res: Response): Promise<void> {
  const auth = mongoService.getCollections().auth;
  const pToken = req.params.token

  if (!pToken) {
    res.status(400).json({ message: 'Token is required in the URL path to authenticate.' });
    return;
  }

  const result = await auth.findOne({ token: pToken });

  if (result) {
    res.json({ returnAuth: result });
  } else {
    res.status(404).json({ message: 'Could not find authentication with that token.' });
  }
}
