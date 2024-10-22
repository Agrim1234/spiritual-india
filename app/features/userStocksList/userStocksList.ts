"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stockProps } from '@/app/page';

const initialState: stockProps[] = []

// Create the slice and pass in the initial state
const userStocksListSlice = createSlice({
    name: 'userStocksList',
    initialState,
    reducers: {
        stockAdded(state, action: PayloadAction<stockProps>) {
            // "Mutate" the existing state array, which is
            // safe to do here because `createSlice` uses Immer inside.
            state.push(action.payload)
        },
        stockUpdated(state, action: PayloadAction<stockProps>) {
            const { PurchasePrice, Symbol } = action.payload
            const existingStock = state.find(stock => stock.Symbol === Symbol)
            if (existingStock) {
                existingStock.PurchasePrice = PurchasePrice 
            }
        },
        stockDeleted(state, action: PayloadAction<stockProps>) {
            const { Symbol } = action.payload
            const existingStock = state.find(stock => stock.Symbol === Symbol)
            if (existingStock) {
                state.splice(state.indexOf(existingStock), 1)
            }
        }
    }
})


// Export the auto-generated action creator with the same name
export const { stockAdded, stockUpdated, stockDeleted  } = userStocksListSlice.actions

// Export the generated reducer function
export default userStocksListSlice.reducer