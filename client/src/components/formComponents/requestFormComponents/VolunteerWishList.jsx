import React from 'react';
import {
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';

export const VolunteerWishList = ({activities, setActivities}) => {

    const handleChange = (event) => {
        setActivities({ ...activities, [event.target.name]: event.target.checked });
        // console.log(activities)
    };

    return (
        <Container sx={{ backgroundColor: 'white', borderRadius: "10px" }}>

            <FormControl component="fieldset">
                <FormLabel component="legend" sx={{
                    '&.Mui-focused': {
                        color: 'black',
                    },
                }} >
                    <Typography sx={{ color:"black" }} >What future volunteer activities are you interested in?</Typography>
                    <Typography sx={{ color:"black" }}>
                        For the clinics, your volunteering with be medical such as blood draws and vitals.
                    </Typography>
                    <Typography sx={{ color:"black" }}>Not doing H&P's</Typography>
                </FormLabel>

                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={activities.bloodDrives} onChange={handleChange} name="bloodDrives" />}
                        label="Blood Drives"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activities.clinic} onChange={handleChange} name="clinic" />}
                        label="Clinic"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activities.children} onChange={handleChange} name="children" />}
                        label="Children"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activities.groupVolunteer} onChange={handleChange} name="groupVolunteer" />}
                        label="Group Volunteer opportunities"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activities.nonPatientRelated} onChange={handleChange} name="nonPatientRelated" />}
                        label="Non-Patient related"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activities.patientRelated} onChange={handleChange} name="patientRelated" />}
                        label="Patient related"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activities.weekendEvents} onChange={handleChange} name="weekendEvents" />}
                        label="Weekend Events (e.g. Community Outreach, Health Fairs, Galas, etc.)"
                    />
                </FormGroup>

            </FormControl>
        </Container>
    );
};

