import { Request, Response } from 'express';
import { perms } from '../auth/perms';
import { mongoService } from '../services/mongoService';
import { authService } from '../services/authService';
import { Raid } from '../models/raid';
import { logger } from '../config/logger';
import { rabbitService } from '../services/rabbitMQService';

export async function getAllRosters(req: Request, res: Response): Promise<void> {
  const raids = mongoService.getCollections().raids;
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

  const result = await raids.find({}).toArray();

  if (result) {
    res.json({ raids: result });
  } else {
    res.status(404).json({ message: 'Unable to find any Roster Information' });
  }
}

export async function postNewRoster(req: Request, res: Response): Promise<void> {
  const authToken = req.headers.authorization;
  const application = 'Roster-Manager';
  if (authToken === undefined || authToken === null){
    res.status(401).json({ message: 'Token is required for access to this functionality' });
    return;
  }

  const timeoutCheck = await authService.checkTimeout(authToken);
  if(timeoutCheck === false) {
    res.status(403).json({ message: 'Authentication Token has expired.' });
    return;
  }

  const permission = await authService.validatePermissions(authToken, perms.raidLead, application);
  
  if(permission === false){
    res.status(403).json({ message: 'You do not have permission to use this functionality.' });
    return;
  }

  if (!req.body) {
    res.status(400).json({ error: 'Request body is missing' });
    return;
  }

  const newRoster: Raid = req.body;


  logger.info('Creating New Roster')
  const tempId = await mongoService.createNewRoster(newRoster);

  if(tempId === 0){
    res.status(500).json({ message: 'Unable To Create New Roster Internal Server Error 500' })
    return;
  }
  
  const result = await rabbitService.sendNewRosterToBot(tempId);

  if (result) {
    res.status(200).json({message: 'New roster sent to BOKBot.'});
  } else {
    res.status(500).json({ message: 'Server is unable to communicate new roster to BOKBot.' });
  }
  return;
}

export async function postModifiedRoster(req: Request, res: Response): Promise<void> {
  const authToken = req.headers.authorization;
  const application = 'Roster-Manager';
  if (authToken === undefined || authToken === null){
    res.status(401).json({ message: 'Token is required for access to this functionality' });
    return;
  }

  const timeoutCheck = await authService.checkTimeout(authToken);
  if(timeoutCheck === false) {
    res.status(403).json({ message: 'Authentication Token has expired.' });
    return;
  }

  const permission = await authService.validatePermissions(authToken, perms.raidLead, application);
  
  if(permission === false){
    res.status(403).json({ message: 'You do not have permission to use this functionality.' });
    return;
  }

  if (!req.body) {
    res.status(400).json({ error: 'Request body is missing' });
    return;
  }

  const updatedRoster: Raid = req.body.data;
  const channelId = req.body.channelId;

  logger.info('Creating New Roster')
  mongoService.updateRoster(updatedRoster, channelId);

  const result = await rabbitService.sendModifiedRosterToBot(channelId);
  
  if (result) {
    res.status(200).json({message: 'Update sent to BOKBot.'});
  } else {
    res.status(500).json({ message: 'Server is unable to communicate updates to BOKBot.' });
  }
  return;
}