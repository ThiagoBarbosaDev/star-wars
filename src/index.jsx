import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/reset.scss'

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if TypeScript
root.render(
  <StrictMode>
    <App tab="home" />
  </StrictMode>
)
