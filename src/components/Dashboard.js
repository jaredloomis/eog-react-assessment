import React             from "react";
import MetricSelect      from "./MetricSelect";
import CurrentMetricData from "./CurrentMetricData";
import { useSelector }   from "react-redux";

export default () => {
  // Currently selected metrics from Redux
  const { selectedMetrics } = useSelector(state => ({
    selectedMetrics: state.metrics.selectedMetrics
  }));

  return (
    <div>
      <MetricSelect/>
      <CurrentMetricData metric={selectedMetrics[selectedMetrics.length-1]}/>
    </div>
  );
};
