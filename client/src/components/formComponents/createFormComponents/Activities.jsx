import React, { useState } from 'react';
import {
    Box,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Typography,
    useTheme,
} from '@mui/material';
import TimePickerForActivity from './TimePickerForActivity';
import { VolunteerNumberForActivity } from './VolunteerNumberForActivity';


export const Activities = ({ activities, setActivities, error, setError }) => {
    const theme = useTheme();

    const handleChange = (event) => {
        const activityName = event.target.name;
        const isChecked = event.target.checked;

        setActivities({
            ...activities,
            [activityName]: {
                ...activities[activityName],
                checked: isChecked,
                startTime: isChecked && activities[activityName].startTime === null ? '00:00' : activities[activityName].startTime,
                endTime: isChecked && activities[activityName].endTime === null ? '00:00' : activities[activityName].endTime,
            },
        });
    };

    const handleTimeChange = (name, startTime, endTime) => {
        setActivities({
          ...activities,
          [name]: { ...activities[name], startTime, endTime },
        });
    };
    
    const handleVolunteerNumberChange = (name, newVolunteerNumber) => {
        setActivities({
            ...activities,
            [name]: { ...activities[name], volunteerNumberNeeded: newVolunteerNumber },
        });
    };
    


    return (
        <Container sx={{borderRadius: '10px' }}>
            <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ '&.Mui-focused': { color: 'black', }, pt: 2, }}>
                    {error && <Typography variant='h6' sx={{color:'red'}}>{error}</Typography>}
                    <Typography sx={{ color: 'black' }}>
                        Choose your events
                    </Typography>
                </FormLabel>

                <FormGroup>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.bloodDrives.checked} onChange={handleChange} name="bloodDrives" />}
                            label="Blood Drives"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.bloodDrives.startTime || '00:00'}
                            initialEndTime={activities.bloodDrives.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeChange("bloodDrives", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberChange("bloodDrives", newVolunteerNumber)} 
                        />
                    </Box>
                    
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.clinic.checked} onChange={handleChange} name="clinic" />}
                            label="Clinic"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.clinic.startTime || '00:00'}
                            initialEndTime={activities.clinic.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeChange("clinic", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberChange("clinic", newVolunteerNumber)} 
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.children.checked} onChange={handleChange} name="children" />}
                            label="Children"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.children.startTime || '00:00'}
                            initialEndTime={activities.children.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeChange("children", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberChange("children", newVolunteerNumber)} 
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.groupVolunteer.checked} onChange={handleChange} name="groupVolunteer" />}
                            label="Group Volunteer opportunities"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.groupVolunteer.startTime || '00:00'}
                            initialEndTime={activities.groupVolunteer.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeChange("groupVolunteer", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberChange("groupVolunteer", newVolunteerNumber)} 
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.nonPatientRelated.checked} onChange={handleChange} name="nonPatientRelated" />}
                            label="Non-Patient related"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.nonPatientRelated.startTime || '00:00'}
                            initialEndTime={activities.nonPatientRelated.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeChange("nonPatientRelated", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberChange("nonPatientRelated", newVolunteerNumber)} 
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.patientRelated.checked} onChange={handleChange} name="patientRelated" />}
                            label="Patient related"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.patientRelated.startTime || '00:00'}
                            initialEndTime={activities.patientRelated.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeChange("patientRelated", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberChange("patientRelated", newVolunteerNumber)} 
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.weekendEvents.checked} onChange={handleChange} name="weekendEvents" />}
                            label="Weekend Events (e.g. Community Outreach, Health Fairs, Galas, etc.)"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.weekendEvents.startTime || '00:00'}
                            initialEndTime={activities.weekendEvents.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeChange("weekendEvents", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberChange("weekendEvents", newVolunteerNumber)} 
                        />
                    </Box>

                </FormGroup>
            </FormControl>
        </Container>
    );
};
