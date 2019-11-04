/**
 * Transform metricMeasurements of the form
 * > {[metricName]: Array<Measurement>}
 * to something digestible by a line graph
 * > [{[metric1]: value1, [metric2]: value2, name: dateStr}, ...]
 */
export default function createGraphData(metricMeasurements = {}) {
  const metricNames = Object.keys(metricMeasurements);

  const maxLength = metricNames.reduce(
    (curMax, metric) => Math.max(curMax, metricMeasurements[metric].length),
    0
  );

  const data = [];
  for (let i = 0; i < maxLength; ++i) {
    // Combine the i'th element of every sampled metric,
    // to allow for line chart rendering.
    const sample = {};
    metricNames.forEach(metricName => {
      const measurement = metricMeasurements[metricName][i];
      if (measurement) {
        sample.name = new Date(measurement.at).toLocaleTimeString();
        sample[metricName] = measurement.value;
      }
    });
    data.push(sample);
  }

  return data;
}

/**
 * Transform metricMeasurements of the form
 * > Array<Array<Measurement>>}
 * to something digestible by a line graph
 * > [{[metric1]: value1, [metric2]: value2, name: dateStr}, ...]
 */
export function createPlotDataMultiple(measGroups) {
  const maxLength = measGroups.reduce(
    (curMax, group) => Math.max(curMax, group.length),
    -1
  );

  const data = [];
  for (let i = 0; i < maxLength; ++i) {
    // Combine the i'th element of every sampled metric,
    // to allow for line chart rendering.
    const sample = {};
    measGroups.forEach(group => {
      const measurement = group.measurements[i];
      if (measurement) {
        sample.name = new Date(measurement.at).toLocaleTimeString();
        sample[measurement.metric] = measurement.value;
      }
    });
    data.push(sample);
  }

  return data;
}
