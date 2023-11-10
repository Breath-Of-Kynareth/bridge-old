import { MongoClient, Db, Collection } from 'mongodb';
import { config } from "../config/config";
import { Raid } from '../models/raid';
 
interface Collections {
    raids: Collection;
    auth: Collection;
    reports: Collection;
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
      reports: null as unknown as Collection
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
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

  getCollections(): Collections {
    return this.collections;
  }

  async createNewRoster(raid: Raid){
    const db = this.getCollections().raids;

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

    await db.insertOne(record);  
  }
}

const mongoService = new MongoService();

export { mongoService };