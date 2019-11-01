import React,
  { useEffect, useState,
    useRef }                from "react";
import Paper                from "@material-ui/core/Paper";
import Typography           from "@material-ui/core/Typography";
import { Query, Provider }  from "urql"
import { gqlClient }        from "../store/api"

const updateInterval = 1300;

const currentDataQuery = `query lastKnownMeasurement($metric: String!) {
    getLastKnownMeasurement(metricName: $metric) {
      metric
      at
      value
      unit
    }
  }`;

export default ({ metric }) => {
  return (<Provider value={gqlClient}>
    <Paper>
      <Typography variant="h5" component="h3">
        {metric}
      </Typography>
      <Typography component="p">
        <Query query={currentDataQuery} variables={{ metric }}
               pollInterval={updateInterval} requestPolicy="network-only">
          {({ fetching, data, error, extensions }) => {
            if (fetching) {
              return "Loading...";
            } else if (error) {
              return "Oh no!";
            }

            const measurement = data.getLastKnownMeasurement;

            return `${measurement.value} ${measurement.unit}`;
          }}
        </Query>
      </Typography>
    </Paper>
  </Provider>);
};
