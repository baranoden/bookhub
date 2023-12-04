import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
}
const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState: initialState,
  reducers: {
    getBooks: (state, action) => {
      state.data = action.payload
    },
  },
})
export const { getBooks } = dashboardSlice.actions
export default dashboardSlice.reducer
