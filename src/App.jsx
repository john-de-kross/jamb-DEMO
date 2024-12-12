import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import FirstLayout from './Components/FirstLayout'
import ControlState from './Components/StateControl'
import Options from './Components/Options'


function App() {
  return(
    
    <div>
      <ControlState>
        <Routes>
          <Route path='/' element={<FirstLayout />}/>
          <Route path='options' element={<Options />}/>
        </Routes>
      </ControlState>
      
  </div>
  )
   
}

export default App
