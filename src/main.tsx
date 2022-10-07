import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // In dev it will rerender twice the components could be usefull to debug sometimes
  <React.StrictMode> 
    <App />
  </React.StrictMode>
)
