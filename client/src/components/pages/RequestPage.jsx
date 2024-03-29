import { useState, useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { Year }from "../formComponents/requestFormComponents/Year";
import { Email } from "../formComponents/requestFormComponents/Email";
import { VolunteerWishList } from "../formComponents/requestFormComponents/VolunteerWishList";
import { ChicagoOrSinai } from "../formComponents/requestFormComponents/ChicagoOrSinai";
import { TimeAvailability } from "../formComponents/requestFormComponents/TimeAvailability";

//MUI
import { Box, Button, Container, useTheme } from "@mui/material"
import { sendOutVolunteerForm } from "../../utilities/eventAxios";
import { Name } from "../formComponents/requestFormComponents/Name";


const RequestPage = () => {
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
        Blood_Drive: false,
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
        Monday : [0,0],
        Tuesday : [0,0],
        Wednesday : [0,0],
        Thursday : [0,0],
        Friday : [0,0],
        Saturday : [0,0],
        Sunday : [0,0],
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
        
        //filter all unchecked/false activities and change the data format as objs within an array
        let filteredActivities = Object.keys(activities)
        .filter(key => activities[key] === true)
        .map(key => ({ 'name': key }));

        //filter all unchecked/false day/times and change the data format as objs within an array
        let filteredTimes = Object.keys(selectedTimes)
        .filter(day => selectedTimes[day] !== false)
        .map(day => {
            let time = selectedTimes[day];
            let timeObject = {};
            if (time === true) {
                timeObject = { "start_time": "00:00", "end_time": "23:59" };
            } else if (Array.isArray(time)) {
                timeObject = { 
                    "start_time": time[0].toString().padStart(2, '0') + ":00", 
                    "end_time": (time[1] === 23.59 ? '23:59' : time[1].toString().padStart(2, '0') + ":00")
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
        if (response.id){
            // this need to handle properly
            navigate('/')
        }else {
            alert('errrrrrrrrr')
        }
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
            <form onSubmit={onSubmitForm}>
                <Name name={name} setName={setName} />
                <Email email={email} setEmail={setEmail} />
                <Year year={year} setYear={setYear} />
                <ChicagoOrSinai duration={duration} setDuration={setDuration} />
                <TimeAvailability selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes} />
                <VolunteerWishList activities={activities} setActivities={setActivities} />
                <Box>
                    <Button type="submit" variant='contained'>Submit</Button>
                </Box>
            </form>
        </Container>
    )
}

export default RequestPage;