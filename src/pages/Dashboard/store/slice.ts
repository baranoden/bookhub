import { createSlice } from '@reduxjs/toolkit'
type IState = {
  data: any[]
  loading: boolean
  success: boolean
  products: any[]
  single: any
  user: boolean
  shipment: {
    firstName: string
    lastName: string
    address: string
    city: string
    district: string
  }
  payment: {
    cardHolder: string
    cardNumber: string
    expDate: string
    cvv: string
  }
}
const initialState: IState = {
  data: [],
  loading: false,
  success: false,
  products: [],
  single: {},
  user: false,
  shipment: { firstName: '', lastName: '', address: '', city: '', district: '' },
  payment: { cardHolder: '', cardNumber: '', expDate: '', cvv: '' },
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
      state.user = action.payload
      state.success = action.payload
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
      localStorage.removeItem('cart')
      state.products = []
    },
    setShipment: (state, action) => {
      state.shipment = action.payload
    },
    setPayment: (state, action) => {
      state.payment = action.payload
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
  setShipment,
  setPayment,
} = dashboardSlice.actions
export default dashboardSlice.reducer
