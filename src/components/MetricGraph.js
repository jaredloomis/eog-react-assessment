import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const MetricGraph = ({ metricMeasurements }) => {
  const data = createGraphData(metricMeasurements);

  return (
    <LineChart width={800} height={800} data={data}>
      {Object.keys(metricMeasurements).map(metricName =>
        <Line key={metricName} dataKey={metricName} />
      )}
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

/**
 * Transform metricMeasurements of the form
 * > {[metricName]: Array<Measurement>}
 * to something digestible by a line graph
 * > [{[metric1]: value1, [metric2]: value2, name: dateStr}, ...]
 */
function createGraphData(metricMeasurements={}) {
  const metricNames = Object.keys(metricMeasurements)

  const maxLength = metricNames.reduce(
    (curMax, metricName) => Math.max(curMax, metricMeasurements[metricName].length),
    0
  );

  const data = [];
  for(let i = 0; i < maxLength; ++i) {
    // Combine the i'th element of every sampled metric,
    // to allow for line chart rendering.
    const sample = {};
    metricNames.forEach(metricName => {
      const measurement  = metricMeasurements[metricName][i];
      if(measurement) {
        sample.name        = new Date(measurement.at).toLocaleTimeString();
        sample[metricName] = measurement.value;
      }
    });
    data.push(sample);
  }

  return data;
}

const colorCache = {};
function randomHexColor(seed) {
  return colorCache[seed] ||
    "#"+Math.floor(Math.random()*0xFFFFFF).toString(16);
}

export default MetricGraph;
