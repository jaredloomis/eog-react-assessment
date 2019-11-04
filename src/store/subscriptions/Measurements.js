import { createRequest } from "urql";
import { pipe, subscribe as wsubscribe } from "wonka";
//const gql = require('graphql-tag');
import { gqlClient } from "../api";
import * as actions from "../actions";

// define your GraphQL query
const query = `
  subscription {
    newMeasurement {
      metric at value unit
    }
  }
`;

// create the urql request object
const request = createRequest(query);

export function connectToRedux(dispatch) {
  return pipe(
    gqlClient.executeSubscription(request),
    wsubscribe(({ data, error }) => {
      if (data) {
        const measurement = data.newMeasurement;

        dispatch({
          type: actions.MEASUREMENT_RECEIVED,
          measurement
        });
      }
    })
  );
}
