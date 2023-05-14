import { useContext, useEffect, useState } from "react"
import GreetingCard from "../card/GreetingCard"
import { userContext } from "../context/UserContext"
import  AllEvents  from "../formComponents/getFormComponents/AllEvents"
import { getAllExistEvents } from "../../utilities/eventAxios"
import { Box, Container, Typography } from "@mui/material"



export const ListOfEventsAndHomePage = () => {

    // Use the useContext hook to access and manage user-related state variables from the userContext.
    const { user } = useContext(userContext)
    const [allEventData, setAllEventData] = useState([])
    const [allActivityData, setAllActivityData] = useState([])
    const [allVolunteerData, setAllvolunteerData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllExistEvents()
            setAllEventData(response)
        }
        fetchData()
    },[])
    console.log(user)
    return (

        <Container>
            {user &&
                <Box>
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