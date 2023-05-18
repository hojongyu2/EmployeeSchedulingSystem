import React from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
} from '@mui/material';

export const VolunteerWishList = ({activities, setActivities}) => {

    const handleChange = (event) => {
        setActivities({ ...activities, [event.target.name]: event.target.checked });
        // console.log(activities)
    };

    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend" >
                    <p>What future volunteer activities are you interested in?</p>
                    <p>For the clinics, your volunteering with be medical such as blood draws and vitals.</p>
                    <p>Not doing H&P's</p>
                </FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={activities.Blood_Drive} onChange={handleChange} name="Blood_Drive" />}
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
        </>
    );
};

