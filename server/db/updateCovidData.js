import { MongoClient } from 'mongodb';
import {lastCovidData} from "../fetchData/lastCovidData.js";
const uri = 'mongodb://192.168.122.10:27017/?directConnection=true&serverSelectionTimeoutMS=2000'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const updateCovidData = async () => {
  try {
    await client.connect()
    const db = await client.db('worldData')
    const countries = db.collection('countries')
    const _lastCovidData = await lastCovidData()


    for await (const countriesData of _lastCovidData) {
      await db.collection('covidData')
        .updateMany(
          {$and: [{name: countriesData.name}, {"data.date": {$ne: countriesData.data.date}}]},
          {$push: {data: countriesData.data}}
        )
    }

  } catch (err) {
    console.log(err)
  } finally {
    await  client.close()
    console.log('it is done')
  }
}
updateCovidData().catch(console.dir)

const deleteLastData = async () => {
  try {
    await client.connect()
    const db = await client.db('worldData')
    const covidData = db.collection('covidData')
    const _lastCovidData = await lastCovidData()

    for await (const countriesData of _lastCovidData) {
      await db.collection('covidData')
        .updateMany(
          {},
          {$pull: {data:{date:"2022-10-25"}}}
        )
    }
  }catch(err) {
    console.log(err)
  } finally {
    await  client.close()
    console.log('it is done')
  }

}

deleteLastData().catch(console.dir)