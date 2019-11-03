import React         from "react";
import {useSelector} from "react-redux";
import Paper         from "@material-ui/core/Paper";
import Typography    from "@material-ui/core/Typography";
import { Provider }  from "urql";
import { gqlClient } from "../store/api";

export default ({ metric }) => {
  const { measurements } = useSelector(state => ({
    measurements: state.metrics.measurements[metric]
  }));
  const measurement = measurements && measurements[measurements.length-1];

  return (
    <Provider value={gqlClient}>
      <Paper>
        <Typography variant="h5" component="h3">
          {metric}
        </Typography>
        <Typography component="p">
          {measurement.value} {measurement.unit}
        </Typography>
      </Paper>
    </Provider>
  );
};
