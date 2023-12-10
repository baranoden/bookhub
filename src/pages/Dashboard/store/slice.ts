import { createSlice } from '@reduxjs/toolkit'
type IState = {
  data: any[]
  loading: boolean
  success: boolean
  products: any[]
  single: any
  user: any
}
const initialState: IState = {
  data: [],
  loading: false,
  success: false,
  products: [],
  single: {},
  user: {},
}
const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState: initialState,
  reducers: {
    getBooks: (state, action) => {
      state.data = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    },
    getUserData: (state, action) => {
      state.success = action.payload.success
      state.user = action.payload.user
    },
    setProducts: (state, action) => {
      state.products.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.products))
    },
    removeProducts: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.products))
    },
    getSingleBook: (state, action) => {
      state.single = action.payload
    },
    setCartOnLoad: (state, action) => {
      action.payload?.map((item) => state.products.push(item))
    },
    resetLocalStorage: (state) => {
      localStorage.clear()
      state.products = []
    },
  },
})
export const {
  getUserData,
  getBooks,
  setSuccess,
  setLoading,
  setProducts,
  removeProducts,
  getSingleBook,
  setCartOnLoad,
  resetLocalStorage,
} = dashboardSlice.actions
export default dashboardSlice.reducer
