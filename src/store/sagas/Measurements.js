import { takeEvery, call } from "redux-saga/effects";
import * as actions        from "../actions";
import { toast }           from "react-toastify";
import Api                 from "../api";

function* apiErrorReceived(action) {
  yield call(toast.error, `Error Received: ${action.error}`);
}

function* watchApiError() {
  yield takeEvery(actions.MEASUREMENTS_REQUESTED, apiErrorReceived);
}

export default [watchApiError];
