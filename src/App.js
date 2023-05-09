import React from 'react'
import MyNavbar from './components/MyNavbar'
import Layout from './components/Layout/Index'

const App = () => {
  return (
    <>
      <div className='ui fixed inverted main menu'>
      <MyNavbar />
      </div>
      <div className='ui'>
        <MyNavbar/>
        <Layout/>
      </div>
    </>
  )
}

export default App