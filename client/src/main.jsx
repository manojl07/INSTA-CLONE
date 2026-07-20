import App from './App.jsx'
import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import AuthInitializer from './layouts/AuthInitializer.jsx';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AuthInitializer>
            <App />
          </AuthInitializer>

          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
