import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Input,
    Typography,
    useTheme,
} from '@mui/material';

export const Activities = ({ activity, setActivity }) => {
    const theme = useTheme();
    const [otherValue, setOtherValue] = useState('');

    const handleChange = (event) => {
        setActivity({ ...activity, [event.target.name]: event.target.checked });
    };

    const handleAdd = () => {
        if (otherValue.trim() !== '') {
            setActivity({
                ...activity,
                [otherValue]: false,
            });
            setOtherValue('');
        } else {
            alert('Please enter a value for the other activity.');
        }
    };

    return (
        <Container sx={{ backgroundColor: 'white', borderRadius: '10px' }}>
            <FormControl component="fieldset">
                <FormLabel
                    component="legend"
                    sx={{
                        '&.Mui-focused': {
                            color: 'black',
                        },
                        pt: 2,
                    }}
                >
                    <Typography sx={{ color: 'black' }}>
                        What future volunteer activities are you interested in?
                    </Typography>
                </FormLabel>

                <FormGroup>
                <FormControlLabel
                        control={<Checkbox checked={activity.bloodDrives} onChange={handleChange} name="bloodDrives" />}
                        label="Blood Drives"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activity.clinic} onChange={handleChange} name="clinic" />}
                        label="Clinic"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activity.children} onChange={handleChange} name="children" />}
                        label="Children"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activity.groupVolunteer} onChange={handleChange} name="groupVolunteer" />}
                        label="Group Volunteer opportunities"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activity.nonPatientRelated} onChange={handleChange} name="nonPatientRelated" />}
                        label="Non-Patient related"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activity.patientRelated} onChange={handleChange} name="patientRelated" />}
                        label="Patient related"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={activity.weekendEvents} onChange={handleChange} name="weekendEvents" />}
                        label="Weekend Events (e.g. Community Outreach, Health Fairs, Galas, etc.)"
                    />
                    {Object.keys(activity).map((key) => {
                        if (
                            key !== 'bloodDrives' &&
                            key !== 'clinic' &&
                            key !== 'children' &&
                            key !== 'groupVolunteer' &&
                            key !== 'nonPatientRelated' &&
                            key !== 'patientRelated' &&
                            key !== 'weekendEvents'
                        ) {
                            return (
                                <FormControlLabel
                                    key={key}
                                    control={
                                        <Checkbox
                                            checked={activity[key]}
                                            onChange={handleChange}
                                            name={key}
                                        />
                                    }
                                    label={key}
                                />
                            );
                        }
                        return null;
                    })}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            pb: 1,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Input
                                    value={otherValue}
                                    onChange={(e) => setOtherValue(e.target.value)}
                                />
                            }
                            label="Other :"
                        />
                        <Button
                            onClick={handleAdd}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: 'black',
                            }}
                        >
                            add
                        </Button>
                    </Box>
                </FormGroup>
            </FormControl>
        </Container>
    );
};


