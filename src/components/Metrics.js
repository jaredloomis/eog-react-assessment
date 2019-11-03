import React, { useState } from "react";
import { useSelector }     from "react-redux";
import Grid                from "@material-ui/core/Grid";
import MetricSelect        from "./MetricSelect";
import CurrentMetricData   from "./CurrentMetricData";
import MetricGraph         from "./MetricGraph";
import { gqlClient }       from "../store/api";

const measurementsQuery = `
  query measurements($input: MeasurementQuery) {
    getMeasurements(input: $input) {
      metric at value unit
    }
  }
`;

const Metrics = props => {
  const [startTime, setStartTime] = useState(0);
  //const [measurements, setMeasurements] = useState(0);
  const { selectedMetrics, measurements } = useSelector(state => ({
    selectedMetrics: state.metrics.selectedMetrics,
    measurements: state.metrics.measurements
  }));

  // Set start time
  if (!startTime) {
    setStartTime(new Date().getTime());
  }

  // Most recently selected metric's graph is displayed
  const primaryMetric = selectedMetrics[selectedMetrics.length - 1];

  const initMeasurements = measurements && measurements[primaryMetric];

  // Create a slice of measurements including only selected metrics.
  const selectedMeasurements = {};
  for(const metric of selectedMetrics) {
    selectedMeasurements[metric] = measurements[metric];
  }

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
        {initMeasurements && <MetricGraph metricMeasurements={selectedMeasurements} />}
    </div>
  );
};

export default Metrics;
