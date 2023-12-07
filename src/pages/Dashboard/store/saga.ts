import axios, { AxiosResponse } from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { dashboardTypes } from './type'
import { application } from '../../../redux/store'
import { getBooks, getUserData, setLoading, setProducts, setSuccess } from './slice'
import { credentials } from '../../../utils/creds'
import toast from 'react-hot-toast'

function* getProductsHandler({ payload }: any) {
  yield put(setLoading(true))
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(
        `${application.api}volumes?q=subject:science&maxResults=20&startIndex=${
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

function* categoryViewHandler({ payload }: any) {
  yield put(setLoading(true))
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(
        `${application.api}volumes?q=subject:${payload.category}&maxResults=20&startIndex=${
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

function* authorViewHandler({ payload }: any) {
  yield put(setLoading(true))
  try {
    const response: AxiosResponse = yield call(() =>
      axios.get(
        `${application.api}volumes?q=author:${payload.author}&maxResults=20&startIndex=${
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

function* loginHandler({ payload }: any) {
  yield put(setLoading(true))
  try {
    const { username, password } = payload
    if (username === credentials.username && password === credentials.password) {
      yield put(getUserData(true))
      toast.success('Giriş başarılı')
      localStorage.setItem('user', 'success')
    } else {
      yield put(getUserData(false))
      toast.error('Kullanıcı adı veya şifre yanlış')
      localStorage.setItem('user', 'error')
    }
  } catch (error) {
    yield put(setSuccess(false))
    localStorage.setItem('user', 'error')
  } finally {
    yield put(setLoading(false))
  }
}

function* addToCartHandler({ payload }: any) {
  yield put(setLoading(true))
  try {
    yield put(setProducts(payload))
  } catch (error) {
    yield put(setSuccess(false))
    localStorage.setItem('user', 'error')
  } finally {
    yield put(setLoading(false))
  }
}

export function* dashboardSaga() {
  yield all([
    takeEvery(dashboardTypes.GET_PRODUCTS, getProductsHandler),
    takeEvery(dashboardTypes.SEARCH_PRODUCTS, searchProductsHandler),
    takeEvery(dashboardTypes.CATEGORY_VIEW, categoryViewHandler),
    takeEvery(dashboardTypes.POST_LOGIN, loginHandler),
    takeEvery(dashboardTypes.ADD_TO_CART, addToCartHandler),
    takeEvery(dashboardTypes.AUTHOR_VIEW, authorViewHandler),
  ])
}
