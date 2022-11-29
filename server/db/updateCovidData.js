import * as dotenv from 'dotenv'
dotenv.config()
import { MongoClient } from 'mongodb';
import {lastCovidData} from "../fetchData/lastCovidData.js";

import moment from "moment";

const uriLocal = process.env.MONGODB_URI_LOCAL
const uriAtlas = process.env.MONGO_URL_ATLAS
const uriReplica = process.env.MONGO_REPLICA

const client = new MongoClient(uriLocal, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const client2 = new MongoClient(uriLocal, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export const updateCovidData = async () => {
  try {
    await client2.connect()
    const db = await client.db('worldData')
    const countries = db.collection('covidData')
    const _lastCovidData = await lastCovidData()
   
    for await (const countriesData of _lastCovidData) {
      await countries
        .updateMany(
          {$and: [{name: countriesData.name}, {"data.date": {$ne: countriesData.data.date}}]},
          {$push: {data: countriesData.data}}
        )
    }

  } catch (err) {
    console.log(err)
  } finally {
    await  client2.close()
    console.log('it is done')
  }
}

const lastDayOfMonths   = moment().endOf('month').format('YYYY-MM-DD');
const now = moment().subtract(1, 'day').format('YYYY-MM-DD')

export const updateCovidDataPerMonths = async () => {
  try {
    await client.connect()
    const db = await client.db('worldData')
    const countries = db.collection('covidDataPerMonths')
    const _lastCovidData = await lastCovidData()
    
    for await (const countriesData of _lastCovidData) {
      const deleteLastData = await countries
        .updateMany(
          {"data.date": {$ne: lastDayOfMonths}},
          {$pull: {data:{date:now}}}
        )
      console.log('deleteLastData:',deleteLastData.modifiedCount)
    }
    for await (const countriesData of _lastCovidData) {
      const insertLastData = await countries
        .updateMany(
          {$and: [
              {name: countriesData.name},
              {"data.date": {$ne: countriesData.data.date}},
              // {"data.date": {$ne: lastDayOfMonths}}
            ]},
          {$push: {data: countriesData.data}}
        )
      console.log('insertLastData:',insertLastData.modifiedCount)
    }
 
    
  } catch (err) {
    console.log(err)
  } finally {
    await  client.close()
    console.log('it is done')
  }
}


