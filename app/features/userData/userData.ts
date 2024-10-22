"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface userDataProps {
    dataId: string,
    title: string,
    desc: string,
    postTime: string,
    charCount: string | undefined
}

const initialState: userDataProps[] = []

// Create the slice and pass in the initial state
const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        userDataAdded(state, action: PayloadAction<userDataProps>) {
            // "Mutate" the existing state array, which is
            // safe to do here because `createSlice` uses Immer inside.
            const { dataId, title, desc, postTime, charCount } = action.payload
            if( state.includes({dataId, title, desc, postTime, charCount: undefined}) && charCount ){
                const data = state.find(userDataObject => userDataObject.dataId === dataId)
                if(data){
                    data.charCount = charCount
                }
            }else{
                state.push(action.payload)
            }
        }
        // stockUpdated(state, action: PayloadAction<stockProps>) {
        //     const { CompanyName, Price, PurchasePrice, Symbol } = action.payload
        //     const existingStock = state.find(stock => stock.Symbol === Symbol)
        //     if (existingStock) {
        //         existingStock.PurchasePrice = PurchasePrice
        //     }
        // },
        // stockDeleted(state, action: PayloadAction<stockProps>) {
        //     const { Symbol } = action.payload
        //     const existingStock = state.find(stock => stock.Symbol === Symbol)
        //     if (existingStock) {
        //         state.splice(state.indexOf(existingStock), 1)
        //     }
        // }
    }
})


// Export the auto-generated action creator with the same name
export const { userDataAdded } = userDataSlice.actions

// Export the generated reducer function
export default userDataSlice.reducer