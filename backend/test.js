import { MongoDBService } from "./dist/MongoDBService.js";

async function main() {
  const db = new MongoDBService("mongodb://localhost:27017");
  await db.connect();
  const res = await db.getAllJobs();
  // const coll = await db.get("school", "students");
  // const docs = await coll.find({ name: "Gay" }).toArray();
  // const res = JSON.stringify(docs, null, 2);
  // console.log(res, typeof res);
  console.log(res);
  await db.close();
}

main();
