import axios, { AxiosResponse } from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { dashboardTypes } from './type'
import { application } from '../../../redux/store'
import { getBooks, setLoading, setSuccess } from './slice'

function* getProductsHandler({ payload }: any) {
  yield put(setLoading(true))
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(
        `${application.api}volumes?q=elon-musk&maxResults=20&startIndex=${
          payload.page ? payload.page : 0
        }&key=${process.env.REACT_APP_API_KEY}`,
      ),
    )
    yield put(setSuccess(true))

    yield put(getBooks(response.data))
  } catch (error) {
    yield put(setSuccess(false))
  } finally {
    yield put(setLoading(false))
  }
}

function* searchProductsHandler({ payload }: any) {
  yield put(setLoading(true))
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(
        `${application.api}volumes?q=${payload.search}&maxResults=20&startIndex=${
          payload.page ? payload.page : 0
        }&key=${process.env.REACT_APP_API_KEY}`,
      ),
    )
    yield put(setSuccess(true))

    yield put(getBooks(response.data))
  } catch (error) {
    yield put(setSuccess(false))
  } finally {
    yield put(setLoading(false))
  }
}

export function* dashboardSaga() {
  yield all([
    takeEvery(dashboardTypes.GET_PRODUCTS, getProductsHandler),
    takeEvery(dashboardTypes.SEARCH_PRODUCTS, searchProductsHandler),
  ])
}
