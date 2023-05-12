import { useState } from "react";
import { useNavigate } from 'react-router';
import { EventTitleWithDateTime } from "../formComponents/createFormComponents/EventTitleWithDateTime"
import { Title } from "../formComponents/createFormComponents/Title";
//MUI
import { Box, Button, Container } from "@mui/material"
import { Activities } from "../formComponents/createFormComponents/Activities";
import { VolunteerNumberForActivity } from "../formComponents/createFormComponents/VolunteerNumberForActivity";

export const CreateEventPage = () => {
    const [title, setTitle] = useState('');
    const [dateOfEvent, setDateOfEvent] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [activities, setActivities] = useState({
        bloodDrives: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0},
        clinic: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0 },
        children: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0 },
        groupVolunteer: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0 },
        nonPatientRelated: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0 },
        patientRelated: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0 },
        weekendEvents: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0 },
    });
    const navigate = useNavigate()

    const filtered = {}

    const onSubmitCreateEvent = (e) => {
        e.preventDefault()
            // filtering only true value for activities on form submit and stored in filterd object.
        for (let key in activities) {
            if (activities[key].checked === true){
                filtered[key] = activities[key]
            }else {
                continue
            }
        }
        const eventData = {
            title,
            dateOfEvent,
            startTime,
            endTime,
            activities: filtered
        }  
        console.log(eventData)
        // navigate('/')
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
                    <Activities activities={activities} setActivities={setActivities} />
                    <Box>
                        <Button type="submit" variant='contained'>Create Event</Button>
                    </Box>
                </Box>
            </form>
        </Container>
    )
}