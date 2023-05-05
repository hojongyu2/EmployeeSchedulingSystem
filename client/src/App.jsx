import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import CustomThemeProvider from './CustomThemeProvider'
import Layout from './components/layout/Layout'
import { LoginPage } from './components/pages/LoginPage'
import { SignUpPage } from './components/pages/SignUpPage'
import { CreateFormAndHomePage } from './components/pages/CreateFormAndHomePage'
import UserContextProvider from './components/context/UserContext'



function App() {
  const router = createHashRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <CreateFormAndHomePage />
        },
        {
          path: '/signup',
          element: <SignUpPage />
        },
        {
          path: '/login',
          element: <LoginPage />
        },
      ]
    },
  ])
  return (
    <CustomThemeProvider>
      <UserContextProvider>
          <RouterProvider router={router}/>
      </UserContextProvider>
    </CustomThemeProvider>
  )
}

export default App
