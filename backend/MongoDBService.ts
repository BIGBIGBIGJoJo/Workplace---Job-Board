import {
  MongoClient,
  Db,
  Collection,
  FindCursor,
  type MongoClientOptions,
  ServerApiVersion,
} from "mongodb";

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export class WorkPlaceMongoDBService {
  private client: MongoClient | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.client = this.getClient();
  }

  private getClient(): MongoClient {
    //signleton
    if (!this.client) {
      const client = new MongoClient(this.url, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        maxPoolSize: 20, //default pool config
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        allowPartialTrustChain: undefined,
        ALPNProtocols: undefined,
        ca: undefined,
        cert: undefined,
        checkServerIdentity: undefined,
        ciphers: undefined,
        crl: undefined,
        ecdhCurve: undefined,
        key: undefined,
        minDHSize: undefined,
        passphrase: undefined,
        pfx: undefined,
        rejectUnauthorized: undefined,
        secureContext: undefined,
        secureProtocol: undefined,
        servername: undefined,
        session: undefined,
        autoSelectFamily: undefined,
        autoSelectFamilyAttemptTimeout: undefined,
        keepAliveInitialDelay: undefined,
        family: undefined,
        hints: undefined,
        localAddress: undefined,
        localPort: undefined,
        lookup: undefined,
      });
      this.client = client;
    }
    return this.client;
  }

  private async isConnected(): Promise<Boolean> {
    try {
      const db = this.client!.db();
      const res = await db.admin().ping();
      if (res && res.ok === 1) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  private async getDatabase(dbName: string): Promise<Db> {
    if (await this.isConnected()) {
      return this.client!.db(dbName);
    } else {
      throw new Error("Client Connection Lost");
    }
  }

  private async getCollection(
    dbName: string,
    collName: string
  ): Promise<Collection> {
    if (await this.isConnected()) {
      return this.client!.db(dbName).collection(collName);
    } else {
      throw new Error("Client Connection Lost");
    }
  }

  async connect(): Promise<void> {
    try {
      if (this.client) {
        await this.client!.connect();
      }
    } catch (e) {
      console.log(e);
    }
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  }

  async userExist(email: string): Promise<boolean> {
    return (
      (await (
        await this.getCollection("Work-Place", "Users")
      ).findOne({ email: email })) !== null
    );
  }

  async addUser(newUser: NewUser): Promise<void> {
    const usersCollection = await this.getCollection("Work-Place", "Users");
    await usersCollection.insertOne({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
    });
  }

  async getUser(userEmail: string): Promise<any> {
    const user = await (
      await this.getCollection("Work-Place", "Users")
    )
      .find({
        email: userEmail,
      })
      .toArray();
      
    return JSON.stringify(user);
  }

  async getAllJobs(reverse: Boolean = false): Promise<string> {
    const findCursor = (await this.getCollection("Work-Place", "Jobs")).find(
      {}
    );
    let res;
    switch (reverse) {
      case true:
        res = await findCursor.sort({ _id: -1 }).toArray();
        break;
      case false:
        res = await findCursor.sort({ _id: 1 }).toArray();
        break;
    }

    return JSON.stringify(res);
  }
}
