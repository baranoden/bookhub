import React from 'react'
import Router from './router/Router'
import { Toaster } from 'react-hot-toast'
const App = (): JSX.Element => {
  return (
    <>
      <Router />
      <Toaster position="top-left" />
    </>
  )
}

export default App
