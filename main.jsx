import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { ClerkProvider } from '@clerk/clerk-react'
import './assets/styles/global.css'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <React.StrictMode>
      
      <App />
    </React.StrictMode>
  </ClerkProvider>
)
