import { Request, Response } from 'express';
import { perms } from '../auth/perms';
import { config } from '../config/config';
import { mongoService } from '../services/mongoService';

export async function getRaids(req: Request, res: Response): Promise<void> {
  const raids = mongoService.getCollections().raids;
  const auth = mongoService.getCollections().auth;
  const authToken = req.headers.authorization;
  
  if (authToken === undefined || authToken === null){
    res.status(403).json({ message: 'Token is required for access to this functionality' })
  }

  const result = await raids.find({}).toArray();

  if (result) {
    res.json({ raids: result });
  } else {
    res.status(404).json({ message: 'Could not find authentication with that token.' });
  }
}

export async function postRaid(req: Request, res: Response): Promise<void> {
  const raids = mongoService.getCollections().raids;
  const auth = mongoService.getCollections().auth;
  const authToken = req.headers.authorization; // const result = await auth.findOne({ token: authToken.replace("Bearer ", "") });

  if (authToken === undefined || authToken === null){
    res.status(403).json({ message: 'Token is required for access to this functionality' })
  } else {
    const result = await auth.findOne({ token: authToken.replace("Bearer ", "") });
  }

  const result = await raids.find({}).toArray();

  if (result) {
    res.json({ returnAuth: result });
  } else {
    res.status(404).json({ message: 'Could not find authentication with that token.' });
  }
}
