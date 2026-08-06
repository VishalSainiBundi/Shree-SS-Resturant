import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Redux/Store.js'
import ScrollToTop from './components/Scroll.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop/>
      <App />
  
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)