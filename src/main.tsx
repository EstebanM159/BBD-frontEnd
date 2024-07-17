import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="471202772717-flcg9pb2p142kgeirnmqs8am770qb2rl.apps.googleusercontent.com">
        <Router/>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
