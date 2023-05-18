import { useContext, useEffect, useState } from "react"
import GreetingCard from "../card/GreetingCard"
import { userContext } from "../context/UserContext"
import  AllEvents  from "../formComponents/getFormComponents/AllEvents"
import { getAllExistEvents } from "../../utilities/eventAxios"
import { Box, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import ErrorAlertBar from "../snackbars/ErrorAlertBar"


const ListOfEventsAndHomePage = () => {

    // Use the useContext hook to access and manage user-related state variables from the userContext.
    const { user, setUser } = useContext(userContext)
    const [allEventData, setAllEventData] = useState([])
    const [allActivityData, setAllActivityData] = useState([])
    const [allVolunteerData, setAllvolunteerData] = useState([])
    const navigate = useNavigate()

    // open/close state variable for snack alert bar
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Check if user is logged in
            const isUserInLocalStorage = localStorage.getItem('currentUser');
            if (isUserInLocalStorage) {
              const response = await getAllExistEvents();
              if (response) {
                  setAllEventData(response);
              }
            } else {
                // If use does not exist, then clear the user state variable and localStorage, then navigate to home page
                setOpen(true); // set open to true here
                setTimeout(() => {
                    localStorage.clear();
                    setUser(null)
                }, 2000);
            }
          } catch (error) {
            // If the token is expired (status 401), clear the localStorage and navigate to the login page
            if (error.response && error.response.status === 401) {
                setOpen(true); // and here
                setTimeout(() => {
                    localStorage.clear();
                    setUser(null)
                }, 2000);
            } else {
                // Handle other errors
                console.error(error);
            }
          }
        };
        fetchData();
    }, [navigate, setUser]);
    
    return (

        <Container>
            {user &&
                <Box>
                    <ErrorAlertBar open={open} setOpen={setOpen} />
                    <Typography>List of all events created</Typography>
                    <AllEvents allEventData={allEventData} setAllEventData={setAllEventData} allActivityData={allActivityData} setAllActivityData={setAllActivityData} allVolunteerData={allVolunteerData} setAllvolunteerData={setAllvolunteerData} />
                </Box>
            }
            {!user &&
                <Box>
                    <GreetingCard />
                </Box>
            }
        </Container>
    )
}

export default ListOfEventsAndHomePage;