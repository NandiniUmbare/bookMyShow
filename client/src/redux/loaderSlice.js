import {createSlice} from '@reduxjs/toolkit'

const loaderSlice = createSlice({
    name: 'loaders', //name of the slice
    initialState: {
        loading: false
    },
    reducers: {
        ShowLoading: (state) => {
            state.loading = true
        },
        HideLoading: (state) => {
            state.loading = false
        }
    }
})

export const {ShowLoading, HideLoading} = loaderSlice.actions
export default loaderSlice.reducer