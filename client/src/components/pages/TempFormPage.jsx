import { useState, useContext } from "react"
import { Form, useNavigate } from 'react-router-dom';
import { Year }from "../formComponents/Year";
import { Email } from "../formComponents/Email";
import { FutureVolunteerings } from "../formComponents/FutureVolunteerings";
import { EventTitleWithDateTime } from "../formComponents/EventTitleWithDateTime";
import { ChicagoOrSinai } from "../formComponents/ChicagoOrSinai";
import { TimeAvailability } from "../formComponents/TimeAvailability";

//MUI
import { Box, Button, Container, Switch, Typography, useTheme } from "@mui/material"


export const TempFormPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const [email, setEmail] = useState('')
    const [year, setYear] = useState('');
    const [duration, setDuration] = useState('');

    const [futureOpportunity, setFutureOpportunity] = useState({
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
        Monday : null,
        Tuesday : null,
        Wednesday : null,
        Thursday : null,
        Friday : null,
        Saturday : null,
        Sunday : null,
      });

    const onSubmitForm = async (e) => {
        // console.log(email)
        // console.log(year)
        // console.log(opportunity)
        // console.log(duration)
        // console.log(futureOpportunity)
        // console.log(selectedTimes)
        e.preventDefault()
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
                    <FutureVolunteerings futureOpportunity={futureOpportunity} setFutureOpportunity={setFutureOpportunity} />
                    <TimeAvailability selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes} />
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
                        <Button type="submit" variant='contained'>submit</Button>
                    </Box>
                </Container>
            </Form>
        </Container>
    )
}