import * as actions from "../actions";

const initialState = {
  selectedMetrics: []
};

function metricChartSelected(state, event) {
  return {
    ...state,
    selectedMetrics: event.metrics
  };
}

function metricListReceived(state, event) {
  return {
    ...state,
    availableMetrics: event.metrics
  };
}

function measurementsReceived(state, event) {
  const rawMeasurements = event.measurements || [event.measurement];
  if (!rawMeasurements || rawMeasurements.length === 0) {
    return state;
  }

  const measurements = rawMeasurements.reduce((acc, meas) => {
    const { metric } = meas;
    return {
      ...acc,
      [metric]: (acc[metric] || []).concat([meas])
    };
  }, state.measurements || {});

  return {
    ...state,
    measurements
  };
}

const handlers = {
  [actions.METRIC_CHART_SELECTED]: metricChartSelected,
  [actions.METRIC_LIST_RECEIVED]: metricListReceived,
  [actions.MEASUREMENTS_RECEIVED]: measurementsReceived,
  [actions.MEASUREMENT_RECEIVED]: measurementsReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
