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
  return state;
}

function measurementsReceived(state, event) {
  const curMeasurements = state.measurements || [];
  const {metric} = event;
  const newMeasurements = event.measurements;
  return {
    ...state,
    measurements: {
      ...state.measurements,
      [metric]: (curMeasurements[metric] || []).concat(newMeasurements)
    }
  };
}

function measurementReceived(state, event) {
  const curMeasurements = state.measurements || [];
  const {metric} = event.measurement;
  const newMeasurement = event.measurement;
  return {
    ...state,
    measurements: {
      ...curMeasurements,
      [metric]: (curMeasurements[metric] || []).concat([newMeasurement])
    }
  };
}

const handlers = {
  [actions.METRIC_CHART_SELECTED]: metricChartSelected,
  [actions.METRIC_LIST_RECEIVED]: metricListReceived,
  [actions.MEASUREMENTS_RECEIVED]: measurementsReceived,
  [actions.MEASUREMENT_RECEIVED]: measurementReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
