import { Collection } from 'mongodb';
import { mongoService } from './mongoService';
import { logger } from '../config/logger';

class AuthService {
  private db2!: Collection;

  constructor() {
    this.db2 = mongoService.getCollections().auth;
  }

  async validatePermissions(bearerToken: string, requirement: string, application: string): Promise<Boolean> {
    const db = mongoService.getCollections().auth;
    const userToken = bearerToken.replace("Bearer ","");
    const document = await db.findOne({ token: userToken });
    if (document === undefined || document === null){
      logger.warn(`Document not found for Token: ${ userToken }`);
      return false;
    }
    const permissions = document.permissions;
    if (permissions.indexOf(requirement) !== -1) {
      logger.info(`User: ${ document.name } has authenticated requirement of ${ requirement} for application ${ application }`);
      return true;
    }
    logger.info(`User: ${ document.name } has failed to authenticate requirement of ${ requirement} for application ${ application }`);
    return false;
  }

}

const authService = new AuthService();

export { authService };