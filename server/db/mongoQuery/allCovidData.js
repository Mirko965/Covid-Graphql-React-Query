import {MongoClient} from "mongodb";

const uri = 'mongodb+srv://mirko:fionfion00@cluster0.zelr3mm.mongodb.net/?retryWrites=true&w=majority'
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
