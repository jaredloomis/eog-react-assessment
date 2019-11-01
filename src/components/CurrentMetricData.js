import React,
  { useEffect, useState }   from "react";
import Paper                from "@material-ui/core/Paper";
import Typography           from "@material-ui/core/Typography";
import { Query, Provider }  from "urql"
import { gqlClient }        from "../store/api"

const updateInterval = 1300;

export default ({ metric }) => {
  const [time, setTime] = useState(0);
  const tick = () => {
    setTime(new Date().getTime())
  };
  const currentDataQuery = `{
    getLastKnownMeasurement(metricName: "tubingPressure") {
      metric
      at
      value
      unit
    }
  }`;

  // Update component every 1.3 seconds
  useEffect(
    () => {
      if(metric) {
        window.setInterval(tick, updateInterval);
      }
    }
  );

  if(!metric) {
    return null;
  }

  return (<Provider value={gqlClient}>
    <Paper>
      <Typography variant="h5" component="h3">
        {metric}
      </Typography>
      <Typography component="p">
        <Query query={currentDataQuery} variables={{ metric }}>
          {({ fetching, data, error, extensions }) => {
            if (fetching) {
              return 'Loading...';
            } else if (error) {
              return 'Oh no!';
            }

            const measurement = data.getLastKnownMeasurement;

            return `${measurement.value} ${measurement.unit}`;
          }}
        </Query>
      </Typography>
    </Paper>
  </Provider>);
};
