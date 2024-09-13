import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layouts/app-layout'
import LandingPage from './components/LandingPage'
import AnalyticsPage from './components/AnalyticsPage'

const App = () => {

  const router = createBrowserRouter([
    {
      element : <AppLayout/>,
      children : [
        {
          path: '/',
          element: <LandingPage/>
        },
        {
          path: "/get-starderd",
          element: <AnalyticsPage/>
        }
      ]
    }
  ])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App