import { useState } from "react";
import { useNavigate } from 'react-router';
import { EventTitleWithDateTime } from "../formComponents/EventTitleWithDateTime"
import { Title } from "../formComponents/createFormComponents/Title";
//MUI
import { Box, Button, Container } from "@mui/material"
import { Activities } from "../formComponents/createFormComponents/Activities";

export const CreateEventPage = () => {
    const [title, setTitle] = useState('');
    const [dateOfEvent, setDateOfEvent] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    
    const [activity, setActivity] = useState({
        bloodDrives: false,
        clinic: false,
        children: false,
        groupVolunteer: false,
        nonPatientRelated: false,
        patientRelated: false,
        weekendEvents: false,
    });

    const navigate = useNavigate()

    const onSubmitCreateEvent = (e) => {
        e.preventDefault()
        console.log(title)
        console.log(dateOfEvent)
        console.log(startTime)
        console.log(endTime)
        console.log(activity)
        navigate('/')
    }

    return (
        <Container sx={{display: "flex", flexDirection: "column", borderRadius: "10px"}}>
            <form onSubmit={onSubmitCreateEvent}>
                <Box sx={{display:'flex', flexDirection:'column', gap:2}}>
                    <Title title={title} setTitle={setTitle} />
                    <EventTitleWithDateTime
                    dateOfEvent={dateOfEvent} 
                    setDateOfEvent={setDateOfEvent} 
                    startTime={startTime} 
                    setStartTime={setStartTime} 
                    endTime={endTime} 
                    setEndTime={setEndTime} />
                    <Activities activity={activity} setActivity={setActivity} />
                    <Box>
                        <Button type="submit" variant='contained'>Create Event</Button>
                    </Box>
                </Box>
            </form>
        </Container>
    )
}