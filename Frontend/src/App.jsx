import React from 'react'
import Navbar from './Components/utils/Navbar'
import Footer from './Components/utils/Footer'
import Routers from './Components/routers/Routers'

const App = () => {
  return (
    <div className='relative'>
      <Navbar/>
      <Routers/>
      <Footer/>
    </div>
  )
}

export default App