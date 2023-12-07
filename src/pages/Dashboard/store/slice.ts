import { createSlice } from '@reduxjs/toolkit'
type IState = {
  data: any[]
  loading: boolean
  success: boolean
  products: any[]
}
const initialState: IState = {
  data: [],
  loading: false,
  success: false,
  products: [],
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
      state.success = action.payload
    },
    setProducts: (state, action) => {
      state.products.push(action.payload)
    },
    removeProducts: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload)
    },
  },
})
export const { getUserData, getBooks, setSuccess, setLoading, setProducts, removeProducts } =
  dashboardSlice.actions
export default dashboardSlice.reducer
