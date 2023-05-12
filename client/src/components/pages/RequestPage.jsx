import { useState, useContext } from "react"
import { Form, useNavigate } from 'react-router-dom';
import { Year }from "../formComponents/requestFormComponents/Year";
import { Email } from "../formComponents/requestFormComponents/Email";
import { VolunteerWishList } from "../formComponents/requestFormComponents/VolunteerWishList";
import { ChicagoOrSinai } from "../formComponents/requestFormComponents/ChicagoOrSinai";
import { TimeAvailability } from "../formComponents/requestFormComponents/TimeAvailability";

//MUI
import { Box, Button, Container, Switch, Typography, useTheme } from "@mui/material"
import { sendOutVolunteerForm } from "../../utilities/eventAxios";
import { Name } from "../formComponents/requestFormComponents/Name";


export const RequestPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const [name, setName] = useState('');
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
    
    let dayMapping = {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Friday": 4,
        "Saturday": 5,
        "Sunday": 6
    };

    const onSubmitForm = async (e) => {
        e.preventDefault()

        let filteredActivities = Object.keys(activities)
        .filter(key => activities[key] === true)
        .map(key => ({ 'name': key }));

        let filteredTimes = Object.keys(selectedTimes)
        .filter(day => selectedTimes[day] !== false)
        .map(day => {
            let time = selectedTimes[day];
            let timeObject = {};
            if (time === true) {
                timeObject = { "start_time": "00:00", "end_time": "24:00" };
            } else if (Array.isArray(time)) {
                timeObject = { 
                    "start_time": time[0].toString().padStart(2, '0') + ":00", 
                    "end_time": time[1].toString().padStart(2, '0') + ":00" 
                };
            }
            return { "day_of_week": dayMapping[day], ...timeObject };
        });

        const data = {
            name,
            email,
            'year_in_school': year,
            'duration_in_chicago':duration,
            'desired_activities' : filteredActivities,
            'availability_set' : filteredTimes,
        }
        console.log(data)
        const response = await sendOutVolunteerForm(data)

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
                    <Name name={name} setName={setName} />
                    <Email email={email} setEmail={setEmail} />
                    <Year year={year} setYear={setYear} />
                    <ChicagoOrSinai duration={duration} setDuration={setDuration} />
                    <TimeAvailability selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes} />
                    <VolunteerWishList activities={activities} setActivities={setActivities} />
                    <Box>
                        <Button type="submit" variant='contained'>Submit</Button>
                    </Box>
                </Container>
            </Form>
        </Container>
    )
}