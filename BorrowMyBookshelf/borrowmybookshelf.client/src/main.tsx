import * as React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import { AuthProvider } from './context/AuthProvider.js';

const maybeRootInIndexFile = document.getElementById('root');
maybeRootInIndexFile ? ReactDOM.createRoot(maybeRootInIndexFile).render(
    <StrictMode>
         <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>

) : console.error(new Error("Could not find root element"));
