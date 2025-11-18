import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import router from './Routes/Routes.jsx'
import AuthProvider from "./Components/AuthContext.jsx";
import React from "react";
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);