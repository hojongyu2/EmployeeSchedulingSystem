import { useContext } from "react"
import GreetingCard from "../card/GreetingCard"
import { Box, Container, Typography, useTheme } from "@mui/material"
import { userContext } from "../context/UserContext"

export const CreateFormAndHomePage = () => {
    const theme = useTheme()

    // Use the useContext hook to access and manage user-related state variables from the userContext.
    const { user, setUser } = useContext(userContext)

    return (

        <Container>
            {user &&
                <Box>
                    <Typography>This will be replaced by create event0-form once user is signed In</Typography>
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