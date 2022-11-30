import * as dotenv from 'dotenv'
dotenv.config()
import {MongoClient} from "mongodb";

const uriLocal = process.env.MONGODB_URI_LOCAL
const uriAtlas = process.env.MONGO_URL_ATLAS
const uriReplica = process.env.MONGO_REPLICA

const client = new MongoClient(uriReplica, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const allCovidDataPerMonths = async () => {
  
  await client.connect()
  const db = await client.db('worldData')
  const covidDataPerMonths = db.collection('covidDataPerMonths')
  return await covidDataPerMonths.find().toArray()
}
