import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import FileContextProvider from './contexts/FileContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <FileContextProvider>
      <App />
    </FileContextProvider>
)
