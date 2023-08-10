import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root.tsx'
import AboutPage from './routes/about.tsx'
import TestePage from './routes/teste.tsx'
import { Layout } from './components/Layout.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/teste',
        element: <TestePage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer autoClose={2500} pauseOnHover={false} />

    <RouterProvider router={router} />
  </React.StrictMode>,
)
