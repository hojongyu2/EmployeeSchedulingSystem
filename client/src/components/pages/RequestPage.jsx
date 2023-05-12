import { useState, useContext } from "react"
import { Form, useNavigate } from 'react-router-dom';
import { Year }from "../formComponents/requestFormComponents/Year";
import { Email } from "../formComponents/requestFormComponents/Email";
import { VolunteerWishList } from "../formComponents/requestFormComponents/VolunteerWishList";
import { ChicagoOrSinai } from "../formComponents/requestFormComponents/ChicagoOrSinai";
import { TimeAvailability } from "../formComponents/requestFormComponents/TimeAvailability";

//MUI
import { Box, Button, Container, Switch, Typography, useTheme } from "@mui/material"


export const RequestPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const [email, setEmail] = useState('')
    const [year, setYear] = useState('');
    const [duration, setDuration] = useState('');

    const [activities, setActivities] = useState({
        bloodDrives: false,
        clinic: false,
        children: false,
        groupVolunteer: false,
        nonPatientRelated: false,
        patientRelated: false,
        weekendEvents: false,
        other: false,
        otherValue: '',
    });

    const [selectedTimes, setSelectedTimes] = useState({
        Monday : [0,24],
        Tuesday : [0,24],
        Wednesday : [0,24],
        Thursday : [0,24],
        Friday : [0,24],
        Saturday : [0,24],
        Sunday : [0,24],
      });

    const filteredActivities = {}
    const filteredDay = {}

    const onSubmitForm = async (e) => {
        e.preventDefault()
        for (let activity in activities){
            if (activities[activity] === true){
                filteredActivities[activity] = activities[activity]
            }
        }
        for (let day in selectedTimes) {
            if (selectedTimes[day] === false){
                continue
            }else {
                filteredDay[day] = selectedTimes[day]
            }
        }
        const data = {
            email,
            year,
            duration,
            activities : filteredActivities,
            selectedTimes : filteredDay,
        }
        console.log(data)
    }
    
    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
        }}
        >  
            <Form onSubmit={onSubmitForm}>
                <Container sx={{display:'flex', flexDirection:'column', gap:2}}>
                    <Email email={email} setEmail={setEmail} />
                    <Year year={year} setYear={setYear} />
                    <ChicagoOrSinai duration={duration} setDuration={setDuration} />
                    <TimeAvailability selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes} />
                    <VolunteerWishList activities={activities} setActivities={setActivities} />
                    <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', gap:2 }}>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            sx={{backgroundColor:'white', borderRadius:'50px'}}
                        />
                        <Typography>Send me a copy of my responses.</Typography>
                    </Box>
                    <Box>
                        <Button type="submit" variant='contained'>Submit</Button>
                    </Box>
                </Container>
            </Form>
        </Container>
    )
}