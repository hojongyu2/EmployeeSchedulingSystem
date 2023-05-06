import React, { usefutureOpportunity } from 'react';
import {
    Box,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Typography,
} from '@mui/material';

export const FutureVolunteerings = ({futureOpportunity, setFutureOpportunity}) => {

    const handleChange = (event) => {
        setFutureOpportunity({ ...futureOpportunity, [event.target.name]: event.target.checked });
        // console.log(futureOpportunity)
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
                        control={<Checkbox checked={futureOpportunity.bloodDrives} onChange={handleChange} name="bloodDrives" />}
                        label="Blood Drives"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={futureOpportunity.clinic} onChange={handleChange} name="clinic" />}
                        label="Clinic"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={futureOpportunity.children} onChange={handleChange} name="children" />}
                        label="Children"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={futureOpportunity.groupVolunteer} onChange={handleChange} name="groupVolunteer" />}
                        label="Group Volunteer opportunities"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={futureOpportunity.nonPatientRelated} onChange={handleChange} name="nonPatientRelated" />}
                        label="Non-Patient related"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={futureOpportunity.patientRelated} onChange={handleChange} name="patientRelated" />}
                        label="Patient related"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={futureOpportunity.weekendEvents} onChange={handleChange} name="weekendEvents" />}
                        label="Weekend Events (e.g. Community Outreach, Health Fairs, Galas, etc.)"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={futureOpportunity.other} onChange={handleChange} name="other" />}
                        label="Other :"
                    />
                    {futureOpportunity.other && (
                        <TextField
                            label="Specify other activity"
                            value={futureOpportunity.otherValue}
                            onChange={(e) => setFutureOpportunity({ ...futureOpportunity, otherValue:e.target.value})}
                            variant="outlined"
                            size="small"
                            sx={{ mt: 1, mb:1 }}
                        />
                    )}
                </FormGroup>

            </FormControl>
        </Container>
    );
};

