import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <App />
    </Router>
  </StrictMode>,
)
