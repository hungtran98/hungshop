import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        logginStart: (state) => {
            state.isFetching = true
        },
        logginSuccess: (state, action) => {
            state.isFetching = false,
            state.currentUser = action.payload
        },
        logginFailure: (state) => {
            state.isFetching = false
            state.error = true
        }
    }
})

export const { logginStart, logginSuccess, logginFailure } = userSlice.actions
export default userSlice.reducer