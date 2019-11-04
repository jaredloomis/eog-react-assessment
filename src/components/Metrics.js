import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import MetricSelect from "./MetricSelect";
import CurrentMetricData from "./CurrentMetricData";
import MetricGraph from "./MetricGraph";
import * as actions from "../store/actions";

const Metrics = props => {
  const [startTime, setStartTime] = useState(0);
  const { selectedMetrics, measurements, availableMetrics } = useSelector(
    state => ({
      ...state.metrics
    })
  );

  // Set start time
  if (!startTime) {
    setStartTime(new Date().getTime());
  }

  const dispatch = useDispatch();

  // On first render, fetch historical measurements for all metrics
  useEffect(() => {
    dispatch({
      type: actions.MEASUREMENTS_REQUESTED,
      queries: (availableMetrics || []).map(name => ({
        metricName: name,
        after: startTime - 2 * 60 * 1000
      }))
    });
  }, [dispatch, availableMetrics, startTime]);

  // Create a slice of measurements including only selected metrics.
  const selectedMeasurements = {};
  for (const metric of selectedMetrics) {
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
      {selectedMeasurements && (
        <MetricGraph metricMeasurements={selectedMeasurements} />
      )}
    </div>
  );
};

export default Metrics;
