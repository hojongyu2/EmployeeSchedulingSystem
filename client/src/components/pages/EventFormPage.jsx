import { useState, useContext } from "react"
import { Form, useNavigate } from 'react-router-dom';
import { Year }from "../formComponents/Year";
import { Email } from "../formComponents/Email";
import { FutureVolunteerings } from "../formComponents/FutureVolunteerings";
import { CurrentVolunteerings } from "../formComponents/CurrentVolunteerings";
import { ChicagoOrSinai } from "../formComponents/ChicagoOrSinai";
import { TimeAvailability } from "../formComponents/TimeAvailability";

//MUI
import { Box, Button, Container, Switch, Typography, useTheme } from "@mui/material"


export const EventFormPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const [email, setEmail] = useState(null)
    const [year, setYear] = useState(null);
    const [duration, setDuration] = useState(null);
    const [opportunity, setOpportunity] = useState({
        massCasualtyDrill: false,
        sinai30th: false,
        sinaiWellnessFair: false,
        other: false,
        otherValue: null
    });
    const [futureOpportunity, setFutureOpportunity] = useState({
        bloodDrives: false,
        clinic: false,
        children: false,
        groupVolunteer: false,
        nonPatientRelated: false,
        patientRelated: false,
        weekendEvents: false,
        other: false,
        otherValue: null,
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

    // console.log(email)
    // console.log(year)
    // console.log(opportunity)
    // console.log(duration)
    // console.log(futureOpportunity)
    // console.log(selectedTimes)

    const onSubmitForm = async (e) => {
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
                    /* maybe show user before email form*/
                    <Email email={email} setEmail={setEmail} />
                    <Year year={year} setYear={setYear} />
                    <ChicagoOrSinai duration={duration} setDuration={setDuration} />
                    <CurrentVolunteerings opportunity={opportunity} setOpportunity={setOpportunity} />
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