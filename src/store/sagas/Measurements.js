import { takeEvery, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import Api from "../api";
import { createPlotDataMultiple } from "../createPlotData";

function* fetchMeasurements(action) {
  const measurements = yield yield call(Api.fetchMeasurements, action.queries);
  console.log(measurements);
  if (measurements) {
    yield put({
      type: actions.MEASUREMENTS_RECEIVED,
      measurements: measurements.flat().flatMap(meas => meas.measurements),
      plotData: createPlotDataMultiple(measurements)
    });
  }
}

function* watchMeasurements() {
  yield takeEvery(actions.MEASUREMENTS_REQUESTED, fetchMeasurements);
}

export default [watchMeasurements];
