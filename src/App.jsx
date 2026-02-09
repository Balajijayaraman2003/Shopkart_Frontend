import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Base/Header'
import Footer from './components/Base/Footer'
import Routingcomp from './routing/Routingcomp'
import { BrowserRouter as Router } from 'react-router-dom'
import BottomNavigationBar from './components/Base/Header/BottomNavigationBar'
import { Container } from 'react-bootstrap'
import TopBar from './components/Base/Header/TopBar'

function App() {

  return (
    <div>
      
        <Router>
          <Header />
          <TopBar />
          <div className="wrapper" >
            <Routingcomp />
          </div>
          <Footer />
        <BottomNavigationBar /> 
        </Router>

    </div>

  )
}

export default App
