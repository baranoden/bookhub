import axios, { AxiosResponse } from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { dashboardTypes } from './type'
import { application } from '../../../redux/store'
import { getBooks } from './slice'
function* getProductsHandler({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(
        `${application.api}volumes?q=elon-musk&maxResults=20&startIndex=${
          payload.page ? payload.page : 0
        }&key=${process.env.REACT_APP_API_KEY}`,
      ),
    )
    yield put(getBooks(response.data))
  } catch (error) {}
}

export function* dashboardSaga() {
  yield all([takeEvery(dashboardTypes.GET_PRODUCTS, getProductsHandler)])
}
