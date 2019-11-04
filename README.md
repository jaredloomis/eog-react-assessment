## Create React App Visualization

This assessment was bespoke handcrafted for jaredloomis.

Read more about this assessment [here](https://react.eogresources.com)

## Higher-level Implementation Notes

- I chose to implement GraphQL->redux syncing outside of React
  components in order to cleanly separate data management and
  UI. This is found in `store/subscriptions/Measurements`.
- To improve performance: process incoming measurements into
  graph points as they come in, instead of recomputing each time.
  See `components/MetricGraph`
- If long-term monitoring was a desired feature I'd next ensure I
  was deleting measurements past a certain point in the past.
- Highcharts is a more battle-tested charting library and supports
  multiple axes.
