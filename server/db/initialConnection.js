import * as dotenv from 'dotenv'
dotenv.config()
import {MongoClient} from 'mongodb';
import moment from "moment";
import {initialCountriesData, initialCovidData} from "./initialData.js";

const uriLocal = process.env.MONGODB_URI_LOCAL
const uriAtlas = process.env.MONGO_URL_ATLAS
const uriReplica = process.env.MONGO_REPLICA

const initialConnection = async () => {
  const client = new MongoClient(uriReplica, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  try {
    await client.connect()
    console.log('MongoDB connect')
    const countriesData = await initialCountriesData()
    const wdData = await initialCovidData()
    const db = await client.db('worldData')
    const countries = db.collection('countries')
    const covidData = db.collection('covidData')
    const options = {ordered: true};
    
    if (await countries.estimatedDocumentCount() > 0) {  //TODO
      const deletedCountries = await db.collection('countries').deleteMany({})
      console.log(`deleted ${deletedCountries.deletedCount} countries`)
      const deleteIndexes = await db.collection('countries').dropIndexes()
      console.log('delete indexes', deleteIndexes)
    }
    if (await covidData.estimatedDocumentCount() > 0) {  //TODO
      const deletedCovidData = await db.collection('covidData').deleteMany({})
      console.log(`deleted ${deletedCovidData.deletedCount} covidData`)
      const deleteIndexes = await db.collection('covidData').dropIndexes()
      console.log('delete indexes', deleteIndexes)
    }
    if (await db.collection('covidDataPerMonths').estimatedDocumentCount() > 0) {  //TODO
      const covidDataPerMonths = await db.collection('covidDataPerMonths').deleteMany({})
      console.log(`deleted ${covidDataPerMonths.deletedCount} covidDataPerMonths`)
      const deleteIndexes = await db.collection('covidDataPerMonths').dropIndexes()
      console.log('delete indexes', deleteIndexes)
    }
    
    
    const countriesResult = await countries.insertMany(countriesData, options);
    
    
    console.log(`${countriesResult.insertedCount} countries were inserted`);
    const countryIndex = await countries.createIndex({"name": 1})
    console.log(`${countryIndex.length} create were index country`);
    
    
    const covidDataResult = await covidData.insertMany(wdData, options)
    console.log(`${covidDataResult.insertedCount} covidData were inserted`);
    
    var getDaysArray = function (start, end) {
      for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
      }
      return arr;
    };
    
    const yesterday = moment().subtract(48, 'hours').format("YYYY-MM-DD")
    const dateArr = getDaysArray("2020-01-01", yesterday).map(d => {
      return {
        date: moment(d).format("YYYY-MM-DD"),
        "total_cases": 0,
        "new_cases": 0,
        "new_cases_smoothed": 0,
        "total_deaths": 0,
        "new_deaths": 0,
        "new_deaths_smoothed": 0,
        "total_cases_per_million": 0,
        "new_cases_per_million": 0,
        "new_cases_smoothed_per_million": 0,
        "total_deaths_per_million": 0,
        "new_deaths_per_million": 0,
      }
    })
    
    for await (const value of dateArr) {
      const data = await covidData.updateMany(
        {"data.date": {$ne: value.date}},
        {
          $push: {
            data: {
              $each: [value],
              $sort: {date: 1}
            }
          }
        }
      )
      console.log(`Modified Count:${data.modifiedCount}`)
    }
    console.log(`update ${dateArr.length} covidData with zero properties`)
    
    const covidDataIndex = await covidData.createIndex({"name": 1}) //TODO
    console.log(`${covidDataIndex.length} create were index inserted`);
    const _countries = await countries
      .find({})
      .project({name: 1})
      .toArray()
    
    
    for await (const _country of _countries) {
      await db.collection('covidData')
        .updateMany({name: _country.name}, {$set: {countryId: _country._id}})
    }
    console.log(`update ${_countries.length} covidData with countryId`)
    
    const dataPerMonths = await db.collection('covidData').aggregate([
        {$unwind: "$data"},
        {
          $project: {
            _id: 0,
            name: 1,
            "country_code": 1,
            truncatedOrderDate: {
              $dateTrunc: {
                date: {$dateFromString: {"dateString": "$data.date"}}, unit: "month", binSize: 1
              }
            },
            data: 1
          }
        },
        {
          $group: {
            _id: {
              country: "$name",
              date: "$truncatedOrderDate",
              "country_code": "$country_code"
            },
            data: {$last: "$data"}
          }
        },
        
        {$sort: {"_id": 1}},
        {
          $group: {
            _id: "$_id.country",
            country_code: {$last: "$_id.country_code"},
            data: {$push: "$data",}
          }
        },
        {
          $project: {
            _id: 0,
            country_code: 1,
            name: "$_id",
            data: 1
          }
        },
        {$sort: {name: 1}},
        //{$out: "covidDataPerMonths"}
      ],
      {allowDiskUse: true}
    ).toArray()
    const covidDataPerMonths = await db.collection("covidDataPerMonths").insertMany(dataPerMonths)
    console.log(`${covidDataPerMonths.insertedCount} covidDataPerMonths were inserted`);
    const covidDataPerMonthsIndex = await db.collection('covidDataPerMonths').createIndex({
      "country": 1,
      "country_code": 1
    }) //TODO
    console.log(`${covidDataPerMonthsIndex.length} create were index inserted`);
    
  } catch (err) {
    console.log({error: err})
  } finally {
    console.log('MongoDB close')
    await client.close()
  }
  
}

initialConnection().catch(console.dir)