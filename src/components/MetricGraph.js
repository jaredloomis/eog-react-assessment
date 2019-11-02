import React, { useState } from "react";
import {
  LineChart, Line, XAxis,
  YAxis, CartesianGrid,
  Tooltip, Legend
}                          from "recharts";

const MetricGraph = ({ measurements }) => {
  const data = createGraphData(measurements);

  return (
    <LineChart width={400} height={400} data={data}>
      <Line dataKey="value"/>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

function createGraphData(measurements) {
  return measurements.map(meas => ({
    name: new Date(meas.at).toLocaleString(),
    value: meas.value
  }))
}

export default MetricGraph;
