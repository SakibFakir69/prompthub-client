


"use client"



import { Provider } from 'react-redux'
import { store } from '../store/store'
import React from 'react'

interface IChildren {
    children: React.ReactNode
}

function ReduxContextProvider({ children }: IChildren) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxContextProvider