import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  createClient,
  defaultExchanges,
  subscriptionExchange,
  createRequest
} from "urql";
import { pipe, subscribe } from "wonka";

const subscriptionClient = new SubscriptionClient(
  'ws://react.eogresources.com/graphql',
  {}
);

export const gqlClient = createClient({
  url: "https://react.eogresources.com/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});

export default {
  async fetchMeasurements(measQueries) {
    const query = `
      query($input: [MeasurementQuery]) {
        getMultipleMeasurements(input: $input) {
          measurements {
            metric at unit value
          }
        }
      }
    `;
    const vars = {
      input: measQueries
    };

    
    return (await executeQuery(query, vars)).getMultipleMeasurements;
  },

  executeQuery: executeQuery
};

function executeQuery(query, vars, cb) {
  return new Promise((resolve, reject) => {
    const request = createRequest(query, vars);
    pipe(
      gqlClient.executeQuery(request),
      subscribe(({ data, error}) => {
        if(error) reject(error);
        else      resolve(data);
      })
    );
  });
}

