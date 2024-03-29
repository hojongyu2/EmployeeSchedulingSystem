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
} from '@mui/material';
import TimePickerForActivity from './TimePickerForActivity';
import { VolunteerNumberForActivity } from './VolunteerNumberForActivity';


export const Activities = ({ activities, setActivities, error, setError }) => {

    const handleOnChange = (event) => {
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

    const handleTimeOnChange = (name, startTime, endTime) => {
        setActivities({
          ...activities,
          [name]: { ...activities[name], startTime, endTime },
        });
    };
    
    const handleVolunteerNumberOnChange = (name, newVolunteerNumber) => {
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
                            control={<Checkbox checked={activities.Blood_Drive.checked} onChange={handleOnChange} name="Blood_Drive" />}
                            label="Blood Drives"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.Blood_Drive.startTime || '00:00'}
                            initialEndTime={activities.Blood_Drive.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeOnChange("Blood_Drive", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberOnChange("Blood_Drive", newVolunteerNumber)} 
                        />
                    </Box>
                    
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.clinic.checked} onChange={handleOnChange} name="clinic" />}
                            label="Clinic"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.clinic.startTime || '00:00'}
                            initialEndTime={activities.clinic.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeOnChange("clinic", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberOnChange("clinic", newVolunteerNumber)} 
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.children.checked} onChange={handleOnChange} name="children" />}
                            label="Children"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.children.startTime || '00:00'}
                            initialEndTime={activities.children.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeOnChange("children", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberOnChange("children", newVolunteerNumber)} 
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.groupVolunteer.checked} onChange={handleOnChange} name="groupVolunteer" />}
                            label="Group Volunteer opportunities"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.groupVolunteer.startTime || '00:00'}
                            initialEndTime={activities.groupVolunteer.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeOnChange("groupVolunteer", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberOnChange("groupVolunteer", newVolunteerNumber)} 
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.nonPatientRelated.checked} onChange={handleOnChange} name="nonPatientRelated" />}
                            label="Non-Patient related"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.nonPatientRelated.startTime || '00:00'}
                            initialEndTime={activities.nonPatientRelated.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeOnChange("nonPatientRelated", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberOnChange("nonPatientRelated", newVolunteerNumber)} 
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.patientRelated.checked} onChange={handleOnChange} name="patientRelated" />}
                            label="Patient related"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.patientRelated.startTime || '00:00'}
                            initialEndTime={activities.patientRelated.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeOnChange("patientRelated", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberOnChange("patientRelated", newVolunteerNumber)} 
                        />
                    </Box>
                    <Box>
                        <FormControlLabel
                            control={<Checkbox checked={activities.weekendEvents.checked} onChange={handleOnChange} name="weekendEvents" />}
                            label="Weekend Events (e.g. Community Outreach, Health Fairs, Galas, etc.)"
                        />
                        <TimePickerForActivity
                            initialStartTime={activities.weekendEvents.startTime || '00:00'}
                            initialEndTime={activities.weekendEvents.endTime || '00:00'}
                            onTimeChange={(startTime, endTime) => handleTimeOnChange("weekendEvents", startTime, endTime)}
                        />
                        <VolunteerNumberForActivity 
                            onVolunteerNumberChange ={(newVolunteerNumber) => handleVolunteerNumberOnChange("weekendEvents", newVolunteerNumber)} 
                        />
                    </Box>

                </FormGroup>
            </FormControl>
        </Container>
    );
};
