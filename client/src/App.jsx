import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CustomThemeProvider from './CustomThemeProvider'
import Layout from './components/layout/Layout'
import { LoginPage } from './components/pages/LoginPage'
import { SignUpPage } from './components/pages/SignUpPage'
import { CreateFormPage } from './components/pages/CreateFormPage'


function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <LoginPage />
        },
        {
          path: '/signup',
          element: <SignUpPage />
        },
        {
          path: '/event',
          element: <CreateFormPage />
        },
      ]
    },
  ])
  return (
    <CustomThemeProvider>
        <RouterProvider router={router}/>
    </CustomThemeProvider>
  )
}

export default App
