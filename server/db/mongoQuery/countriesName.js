import {MongoClient} from "mongodb";

const uri = 'mongodb://192.168.122.10:27017/?directConnection=true&serverSelectionTimeoutMS=2000'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const countriesName = async () => {
  await client.connect()
  const db = await client.db('worldData')
  const covidData = db.collection('covidData')
  return await covidData.find().project({_id: 0, name: 1}).toArray()
}