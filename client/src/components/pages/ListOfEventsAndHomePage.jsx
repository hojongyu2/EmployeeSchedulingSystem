import { useContext } from "react"
import GreetingCard from "../card/GreetingCard"
import { Box, Container, Typography, useTheme } from "@mui/material"
import { userContext } from "../context/UserContext"
import  AllEvents  from "../formComponents/getFormComponents/AllEvents"



export const ListOfEventsAndHomePage = () => {
    const theme = useTheme()

    // Use the useContext hook to access and manage user-related state variables from the userContext.
    const { user, setUser } = useContext(userContext)

    return (

        <Container>
            {user &&
                <Box>
                    <Typography>List of all events created</Typography>
                    <AllEvents />
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