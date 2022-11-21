import {MongoClient} from "mongodb";

const uri = 'mongodb://192.168.122.10:27017/?directConnection=true&serverSelectionTimeoutMS=2000'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const allCovidData= async (country) => {
  await client.connect()
  const db = await client.db('worldData')
  const covidData = db.collection('covidData')
  return await covidData.find({name:{$in: country}}).toArray()
}
