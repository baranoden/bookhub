import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  loading: false,
  success: false,
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
      state.success = action.payload
    },
  },
})
export const { getUserData, getBooks, setSuccess, setLoading } = dashboardSlice.actions
export default dashboardSlice.reducer
