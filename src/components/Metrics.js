import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "urql";
import Grid from "@material-ui/core/Grid";
import MetricSelect from "./MetricSelect";
import CurrentMetricData from "./CurrentMetricData";
import MetricGraph from "./MetricGraph";
import { gqlClient } from "../store/api";

const measurementsQuery = `
  query measurements($input: MeasurementQuery) {
    getMeasurements(input: $input) {
      metric at value unit
    }
  }
`;

const Metrics = props => {
  const [startTime, setStartTime] = useState(0);
  const { selectedMetrics } = useSelector(state => ({
    selectedMetrics: state.metrics.selectedMetrics
  }));

  // Set start time
  if (!startTime) {
    setStartTime(new Date().getTime());
  }

  // Most recently selected metric's graph is displayed
  const primaryMetric = selectedMetrics[selectedMetrics.length - 1];

  const [initRes, executeInitQuery] = useQuery({
    query: measurementsQuery,
    variables: {
      input: {
        metricName: primaryMetric,
        after: startTime - 1 * 60 * 1000,
        before: new Date().getTime()
      }
    },
    context: gqlClient
  });

  const initMeasurements = initRes.data && initRes.data.getMeasurements;

  /*
  const updateData = () => {

  };

  useEffect(() => {
    const interval = setInterval(updateData, 1300);
    return () => clearInterval(interval);
  }, []);*/

  return (
    <div>
      <MetricSelect />
      <Grid container spacing={2}>
        {selectedMetrics.map(metric => (
          <Grid item key={metric}>
            <CurrentMetricData metric={metric} />
          </Grid>
        ))}
      </Grid>
      {initMeasurements && <MetricGraph measurements={initMeasurements} />}
    </div>
  );
};

export default Metrics;
