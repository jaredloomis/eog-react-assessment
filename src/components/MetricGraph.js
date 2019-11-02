import React             from "react";
import Grid              from "@material-ui/core/Grid";
import MetricSelect      from "./MetricSelect";
import MetricGraph       from "./MetricGraph";
import CurrentMetricData from "./CurrentMetricData";
import { useSelector }   from "react-redux";

export default () => {
  const { selectedMetrics } = useSelector(state => ({
    selectedMetrics: state.metrics.selectedMetrics
  }));

  return (
    <div>
      <MetricSelect/>
      <Grid container spacing={2}>
        {selectedMetrics.map(metric =>
          <Grid item key={metric}>
            <CurrentMetricData metric={metric}/>
          </Grid>
        )}
      </Grid>
      <MetricGraph metric={selectedMetrics[selectedMetrics.length-1]}/>
    </div>
  );
};
