import React from 'react'
import classes from './App.module.css'
import MainPage from './Components/MainPage/MainPage'
import SendSayCampon from './Components/sendsay/SendSayCampon'

function App() {
    return (
      <div className={classes.App} >
        <MainPage />
        <SendSayCampon />
      </div>
   )
  }
export default App
