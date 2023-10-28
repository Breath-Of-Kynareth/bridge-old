import { MongoClient, Db, Collection } from 'mongodb';
import { config } from "../config/config";
 
interface Collections {
    raids: Collection;
    auth: Collection;
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
    };
    
    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(config.mongoDB.db);
      this.collections.raids = this.db.collection(config.mongoDB.dbRaids);
      this.collections.auth = this.db.collection(config.mongoDB.dbAuth);
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

  getCollections(): Collections {
    return this.collections;
  }
}

const mongoService = new MongoService();

export { mongoService };