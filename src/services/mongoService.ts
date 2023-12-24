import { MongoClient, Db, Collection } from 'mongodb';
import { config } from "../config/config";
import { Raid } from '../models/raid';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../config/logger';
import { RankDocument } from '../models/ranks';

interface Collections {
    raids: Collection;
    auth: Collection;
    reports: Collection;
    site: Collection;
    misc: Collection;
  }

class MongoService {
  private client: MongoClient;
  private db!: Db;
  private collections: Collections;

  constructor() {
    this.client = new MongoClient(config.mongoDB.mongo);

    this.collections = {
      raids: null as unknown as Collection,
      auth: null as unknown as Collection,
      reports: null as unknown as Collection,
      site: null as unknown as Collection,
      misc: null as unknown as  Collection
    };
    
    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(config.mongoDB.db);
      this.collections.raids = this.db.collection(config.mongoDB.dbRaids);
      this.collections.auth = this.db.collection(config.mongoDB.dbAuth);
      this.collections.reports = this.db.collection(config.mongoDB.dbReports);
      this.collections.site = this.db.collection(config.mongoDB.dbSite);
      this.collections.misc = this.db.collection(config.mongoDB.dbMisc);
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

  getCollections(): Collections {
    return this.collections;
  }

  async createNewRoster(raid: Raid){
    try{
      const db = this.getCollections().site;

      const record: Raid = {
        raid: raid.raid,
        date: raid.date,
        leader: raid.leader,
        dps: {},
        healers: {},
        tanks: {},
        backup_dps: {},
        backup_healers: {},
        backup_tanks: {},
        dps_limit: raid.dps_limit,
        healer_limit: raid.healer_limit,
        tank_limit: raid.tank_limit,
        role_limit: raid.role_limit,
        memo: raid.memo
      };

      const tempId: string = uuidv4();


      const recordWrapper = {
        tempId: tempId,
        data: record
      }

      await db.insertOne(recordWrapper);  

      return tempId;
    } catch(e){
      logger.error(`Create New Roster Error: ${e}`);
      return 0;
    }
  }

  async updateRoster(raid: Raid, id: string) {
    const db = this.getCollections().raids;

    const record: Raid = {
      raid: raid.raid,
      date: raid.date,
      leader: raid.leader,
      dps: raid.dps,
      healers: raid.healers,
      tanks: raid.tanks,
      backup_dps: raid.backup_dps,
      backup_healers: raid.backup_healers,
      backup_tanks: raid.backup_tanks,
      dps_limit: raid.dps_limit,
      healer_limit: raid.healer_limit,
      tank_limit: raid.tank_limit,
      role_limit: raid.role_limit,
      memo: raid.memo
    };

    const filter = { channelID: id };

    const recordWrapper = {
      $set: {
        data: record
      }
    }

    await db.updateOne(filter, recordWrapper);  
  }

  async getRanks(): Promise<string[] | null> {
    try{
      const db = this.getCollections().misc;

      const progRanks: RankDocument | null = await db.findOne({key: 'progRoles'}) as RankDocument | null;

      if(progRanks === null){
        logger.error('Prog Ranks Document returned Null value.');
        return null;
      }

      const mainRanks: RankDocument | null  = await db.findOne({key: 'rankList'}) as RankDocument | null;

      if(mainRanks === null){
        logger.error('Main Ranks Document returned Null value.');
        return null;
      }

      const totalRanks: string[] = mainRanks.data.concat(progRanks.data)

      return totalRanks;

    } catch(e) {
      logger.error(`Encountered Error on GET Ranks: ${ e }`)
      return null;
    }
  }
}

const mongoService = new MongoService();

export { mongoService };