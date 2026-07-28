import { MongoClient } from 'mongodb';
import "dotenv/config"

const client = new MongoClient(process.env.MONGODB_URI)

async function run() {
  try {

    await client.connect()
    console.log("connected to mongo..")

    const db = await client.db("robotics-lab-spec")
    console.log("connected to database..")

    const students = await db.collection("students")
    return students;

  } catch (error) {

    console.error(error)
    await client.close()
    console.log("connection close")
  }
}

export const students = await run()
