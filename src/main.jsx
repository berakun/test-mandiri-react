import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Navbar from './component/navbar.jsx'
import Index from './component/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Index />
      </div>
    </div>
  </React.StrictMode>,
)