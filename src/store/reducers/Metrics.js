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
  return {
    ...state,
    measurements: {
      [event.metric]: (state[event.metric] || []).concat(event.measurements)
    }
  };
}

const handlers = {
  [actions.METRIC_CHART_SELECTED]: metricChartSelected,
  [actions.METRIC_LIST_RECEIVED]: metricListReceived,
  [actions.MEASUREMENTS_RECEIVED]: measurementsReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
