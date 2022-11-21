import {COVID_DATA_PER_MONTHS} from "../graphqlQuery/COVID_DATA_PER_MONTHS";

export const fetchData = fetch("http://localhost:4000/graphql", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: COVID_DATA_PER_MONTHS,
      variables: {  }
    })
  })
    .then(r => r.json())
    .then(data => data.data)