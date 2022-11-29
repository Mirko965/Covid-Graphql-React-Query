import {MongoClient} from "mongodb";

const uri = 'mongodb+srv://mirko:fionfion00@cluster0.zelr3mm.mongodb.net/?retryWrites=true&w=majority'
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
