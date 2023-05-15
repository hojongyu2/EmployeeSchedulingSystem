import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import CustomThemeProvider from './CustomThemeProvider'
import Layout from './components/layout/Layout'
import { LoginPage } from './components/pages/LoginPage'
import { SignUpPage } from './components/pages/SignUpPage'
import { ListOfEventsAndHomePage } from './components/pages/ListOfEventsAndHomePage'
import UserContextProvider from './components/context/UserContext'
import ConfirmationPage from './components/pages/ConfirmationPage'
import { CreateEventPage } from './components/pages/CreateEventPage'
import { RequestPage } from './components/pages/RequestPage'


function App() {
  const router = createHashRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <ListOfEventsAndHomePage />
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
          path: '/create-event',
          element: <CreateEventPage />
        },
        {
          path: '/request',
          element: <RequestPage />
        },
        {
          path: '/confirmation/:response',
          element: <ConfirmationPage />
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
