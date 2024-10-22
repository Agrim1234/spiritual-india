"use client"

import { configureStore } from '@reduxjs/toolkit'
import userStocksListReducer  from '@/app/features/userStocksList/userStocksList'
import userDataReducer  from '@/app/features/userData/userData'

// Define the initial state


const store = configureStore({
    reducer: {
        userStocksList: userStocksListReducer,
        userData: userDataReducer
    },
})


// Infer the type of `store`
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;

