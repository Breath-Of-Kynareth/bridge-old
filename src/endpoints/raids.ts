import { Request, Response } from 'express';
import { perms } from '../auth/perms';
import { mongoService } from '../services/mongoService';
import { authService } from '../services/authService';

export async function getRaids(req: Request, res: Response): Promise<void> {
  const raids = mongoService.getCollections().raids;
  const auth = mongoService.getCollections().auth;
  const authToken = req.headers.authorization;
  const application = req.params.application
  
  if (authToken === undefined || authToken === null){
    res.status(401).json({ message: 'Token is required for access to this functionality' });
    return;
  }

  const permission = await authService.validatePermissions(authToken!, perms.user, application);
  
  if(permission === false){
    res.status(403).json({ message: 'You do not have permission to use this functionality.' });
    return;
  }

  const result = await raids.find({}).toArray();

  if (result) {
    res.json({ raids: result });
  } else {
    res.status(404).json({ message: 'Server is unable to find any Roster Information' });
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
