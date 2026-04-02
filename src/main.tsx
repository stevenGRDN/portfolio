// import { StrictMode } from 'react'
// import React from "react"
// import ReactDOM from "react-dom/client"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { HashRouter } from "react-router-dom"



// ReactDOM.createRoot(document.getElementById("root")!).render(
createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>
)
