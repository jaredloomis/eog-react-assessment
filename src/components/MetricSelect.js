import React, { useEffect }         from "react";
import Select          from "@material-ui/core/Select";
import InputLabel      from "@material-ui/core/InputLabel";
import MenuItem                     from "@material-ui/core/MenuItem";
import {
  useQuery, Provider, createClient
}                                   from "urql";
import { useDispatch, useSelector } from "react-redux";
import * as actions                 from "../store/actions";

const query = "{getMetrics}";

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

export default props =>
  <Provider value={client}>
    <MetricSelect {...props}/>
  </Provider>;

const MetricSelect = props => {
  const { selectedMetricChart } = useSelector(state => ({
    selectedMetricChart: state.metrics.selectedMetricChart
  }));
  const dispatch = useDispatch();

  // Query for available metrics
  const [result] = useQuery({ query });
  const { fetching, data, error } = result;

  // Route incoming data or errors to redux
  useEffect(
    () => {
      if (error) {
        dispatch({ type: actions.API_ERROR, error: error.message });
        return;
      }
      if (!data) return;
      const { getMetrics } = data;
      dispatch({ type: actions.METRIC_LIST_RECEIVED, getMetrics });
    },
    [dispatch, data, error]
  );

  // Respond to selection changes
  const changeHandler = event => {
    if(props.onChange) {
      props.onChange(event.target.value);
    } else {
      dispatch({
        type: actions.METRIC_CHART_SELECTED,
        metricID: event.target.value
      });
    }
  }

  // On error or loading, render an empty select
  const metrics = (data && data.getMetrics) || []

  return (
    <div>
      <InputLabel id="active-metric">Metric</InputLabel>
        <Select
          labelId="active-metric"
          id="active-metric-select"
          value={selectedMetricChart}
          onChange={changeHandler}
        >
          {metrics.map(metric =>
            <MenuItem key={metric} value={metric}>{metric}</MenuItem>
          )}
        </Select>
    </div>
  );
};
