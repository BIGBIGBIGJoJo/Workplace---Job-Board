import {
  MongoClient,
  ObjectId,
  ServerApiVersion,
  type Collection,
  type Db,
  type Document,
  type MongoClientOptions,
} from "mongodb";

export interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface User extends NewUser {
  _id: ObjectId;
}

export interface Job {
  _id: ObjectId;
  [key: string]: unknown;
}

export interface NewJob {
  title: string;
  description: string;
  location: string;
  salary: number;
  type: string;
  company: {
    name: string;
    profile: string;
  };
  postDate: string;
  requirement: string[];
  nature: string;
}

export class WorkPlaceMongoDBService {
  private readonly client: MongoClient;
  private connectPromise: Promise<MongoClient> | null = null;

  constructor(url: string) {
    if (!url) {
      throw new Error("MongoDB connection URL is required");
    }

    const options: MongoClientOptions = {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    } as MongoClientOptions;

    this.client = new MongoClient(url, options);
  }

  private async getDatabase(dbName: string): Promise<Db> {
    const client = await this.connect();
    return client.db(dbName);
  }

  private async getCollection<T extends Document = Document>(
    dbName: string,
    collName: string
  ): Promise<Collection<T>> {
    return (await this.getDatabase(dbName)).collection<T>(collName);
  }

  async connect(): Promise<MongoClient> {
    if (!this.connectPromise) {
      this.connectPromise = this.client.connect();
    }

    return this.connectPromise;
  }

  async close(): Promise<void> {
    await this.client.close();
    this.connectPromise = null;
  }

  async userExist(email: string): Promise<boolean> {
    const usersCollection = await this.getCollection<User>("Work-Place", "Users");
    return (await usersCollection.countDocuments({ email }, { limit: 1 })) > 0;
  }

  async addUser(newUser: NewUser): Promise<void> {
    const usersCollection = await this.getCollection<NewUser>("Work-Place", "Users");
    await usersCollection.insertOne({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
    });
  }

  async getUser(userEmail: string): Promise<User | null> {
    const usersCollection = await this.getCollection<User>("Work-Place", "Users");
    return usersCollection.findOne({ email: userEmail });
  }

  async getAllJobs(reverse = false): Promise<Job[]> {
    const jobsCollection = await this.getCollection<Job>("Work-Place", "Jobs");
    const sortDirection = reverse ? -1 : 1;
    return jobsCollection.find({}).sort({ _id: sortDirection }).toArray();
  }

  async addJob(newJob: NewJob): Promise<Job> {
    const jobsCollection = await this.getCollection<NewJob>("Work-Place", "Jobs");
    const result = await jobsCollection.insertOne(newJob);
    return { _id: result.insertedId, ...newJob };
  }

  async deleteJob(jobId: string): Promise<boolean> {
    const jobsCollection = await this.getCollection<Job>("Work-Place", "Jobs");
    const result = await jobsCollection.deleteOne({ _id: new ObjectId(jobId) });
    return result.deletedCount === 1;
  }
}
