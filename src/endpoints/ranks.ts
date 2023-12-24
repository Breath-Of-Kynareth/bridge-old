import { Request, Response } from 'express';
import { perms } from '../auth/perms';
import { mongoService } from '../services/mongoService';
import { authService } from '../services/authService';
import { logger } from '../config/logger';

export async function getRanks(req: Request, res: Response): Promise<void> {
  const authToken = req.headers.authorization;
  const application = req.params.application
  
  if (authToken === undefined || authToken === null){
    res.status(401).json({ message: 'Token is required for access to this functionality' });
    return;
  }

  const timeoutCheck = await authService.checkTimeout(authToken);
  if(timeoutCheck === false) {
    res.status(403).json({ message: 'Authentication Token has expired.' });
    return;
  }

  const permission = await authService.validatePermissions(authToken!, perms.user, application);
  
  if(permission === false){
    res.status(403).json({ message: 'You do not have permission to use this functionality.' });
    return;
  }

  const result: string[] | null = await mongoService.getRanks();

  if (result !== null) {
    res.json({ ranks: result });
  } else {
    res.status(404).json({ message: 'Unable to find any Rank Information' });
  }
}