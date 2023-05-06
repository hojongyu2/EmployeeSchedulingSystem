import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import CustomThemeProvider from './CustomThemeProvider'
import Layout from './components/layout/Layout'
import { LoginPage } from './components/pages/LoginPage'
import { SignUpPage } from './components/pages/SignUpPage'
import { CreateFormAndHomePage } from './components/pages/CreateFormAndHomePage'
import UserContextProvider from './components/context/UserContext'
import { EventFormPage } from './components/pages/EventFormPage'
import { EventFormListPage } from './components/pages/EventFormListPage'



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
        {
          path: '/form',
          element: <EventFormPage />
        },
        {
          path: '/formLists',
          element: <EventFormListPage />
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
