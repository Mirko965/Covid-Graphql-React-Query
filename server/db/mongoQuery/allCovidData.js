import * as dotenv from 'dotenv'
dotenv.config()
import {MongoClient} from "mongodb";

const client = new MongoClient(uri, {

const uriLocal = process.env.MONGODB_URI_LOCAL
const uriAtlas = process.env.MONGO_URL_ATLAS
const uriReplica = process.env.MONGO_REPLICA

const client = new MongoClient(uriReplica, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const allCovidData= async (country) => {
  await client.connect()
  const db = await client.db('worldData')
  const covidData = db.collection('covidData')
  return await covidData.find({name:{$in: country}}).toArray()
}
