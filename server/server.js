import express from 'express'
import path, {join} from 'path';
import cors from 'cors'
import schedule from "node-schedule";
import {graphqlHTTP} from 'express-graphql'
import {resolvers} from './resolvers.js';
import {addResolversToSchema} from '@graphql-tools/schema'
import {loadSchema} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {allCovidDataPerMonths} from "./db/mongoQuery/allCovidDataPerMonths.js";
import {allCovidData} from "./db/mongoQuery/allCovidData.js";
import {countriesName} from "./db/mongoQuery/countriesName.js";
import {covidDataPerMonthsByCountry} from "./db/mongoQuery/covidDataPerMonthsByCountry.js";
import {updateCovidDataPerMonths, updateCovidData} from "./db/updateCovidData.js";

const __dirname = path.resolve();

const schemaLoad = await loadSchema(join(__dirname, './**/*.graphql'), {
  loaders: [
    new GraphQLFileLoader(),
  ]
});
const schema = addResolversToSchema({
  schema: schemaLoad,
  resolvers,
});

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use("/graphql", graphqlHTTP(
  {
    schema: schema,
    context: {
      allCovidDataPerMonths,
      allCovidData,
      countriesName,
      covidDataPerMonthsByCountry
    },
    graphiql: true,
  }
))


app.listen(4000, () => {
  console.log('Server listen port 4000')
})

//schedule.scheduleJob('* */1 * * *', updateCovidDataPerMonths );
//schedule.scheduleJob('* */1 * * *', updateCovidData );