import {MongoClient} from "mongodb";

const uri = 'mongodb://192.168.122.10:27017/?directConnection=true&serverSelectionTimeoutMS=2000'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const allCovidDataPerMonths = async () => {
  
  await client.connect()
  const db = await client.db('worldData')
  const covidDataPerMonths = db.collection('covidDataPerMonths')
  return await covidDataPerMonths.find().toArray()
}
