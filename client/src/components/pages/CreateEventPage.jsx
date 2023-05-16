import { useContext, useState } from "react";
import { useNavigate } from 'react-router';
import { EventTitleWithDateTime } from "../formComponents/createFormComponents/EventTitleWithDateTime"
import { Title } from "../formComponents/createFormComponents/Title";
//MUI
import { Box, Button, Container } from "@mui/material"
import { Activities } from "../formComponents/createFormComponents/Activities";
import { createEvent } from "../../utilities/eventAxios";
import { userContext } from "../context/UserContext";
import { Instruction } from "../formComponents/createFormComponents/Instruction";
import ErrorAlertBar from "../snackbars/ErrorAlertBar";

const CreateEventPage = () => {
    const {setUser} = useContext(userContext)

    //state variables for event componenets
    const [title, setTitle] = useState('');
    const [dateOfEvent, setDateOfEvent] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [activities, setActivities] = useState({
        bloodDrives: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0, instruction: ''},
        clinic: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0, instruction: ''},
        children: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0, instruction: ''},
        groupVolunteer: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0, instruction: ''},
        nonPatientRelated: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0, instruction: ''},
        patientRelated: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0, instruction: ''},
        weekendEvents: { checked: false, startTime: null, endTime: null, volunteerNumberNeeded: 0, instruction: ''},
    });
    const [instruction, setInstruction] = useState('')

    //error handler for activities 
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    // open/close state variable for snack alert bar
    const [open, setOpen] = useState(false);

    const onSubmitCreateEvent = async (e) => {
        e.preventDefault()
            // filtering only true value for activities on form submit and stored in filterd object.
        const filtered = Object.keys(activities)
        .filter(key => activities[key].checked === true)
        .map(key => ({'activity' : key, "date_of_event" : dateOfEvent, "start_time" : activities[key].startTime, "end_time" : activities[key].endTime, "required_volunteers" : activities[key].volunteerNumberNeeded}))
        
        const eventData = {
            "name" : title,
            "date_of_event" : dateOfEvent,
            "start_time": startTime,
            "end_time": endTime,
            "activities": filtered,
            "reporting_instructions": instruction
        }  

        if (filtered.length === 0){
            setError('You must select one of the option')
        }else {
            try {
                const isUserInLocalStorage = localStorage.getItem('currentUser');
                if (isUserInLocalStorage) {
                    const response = await createEvent(eventData)
                    if(response.data){
                        setError(true)
                        navigate('/')
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setOpen(true); // set open to true here
                    setTimeout(() => {
                        localStorage.clear();
                        setUser(null)
                        navigate('/')
                    }, 2000);
                } else {
                    // Handle other errors
                    console.error(error);
                }
            }
        }
    }

    return (
        <Container sx={{display: "flex", flexDirection: "column", borderRadius: "10px"}}>
            <ErrorAlertBar open={open} setOpen={setOpen} />
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
                    <Activities activities={activities} setActivities={setActivities} error={error} setError={setError} />
                    <Instruction instruction={instruction} setInstruction={setInstruction} />
                    <Box>
                        <Button type="submit" variant='contained'>Create Event</Button>
                    </Box>
                </Box>
            </form>
        </Container>
    )
}

export default CreateEventPage;