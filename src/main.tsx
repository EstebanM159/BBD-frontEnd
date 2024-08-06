import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="471202772717-flcg9pb2p142kgeirnmqs8am770qb2rl.apps.googleusercontent.com">
        <Router/>
        <ReactQueryDevtools initialIsOpen={false} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
