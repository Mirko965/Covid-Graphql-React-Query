import {MongoClient} from "mongodb";

const uri = 'mongodb+srv://mirko:fionfion00@cluster0.zelr3mm.mongodb.net/?retryWrites=true&w=majority'
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