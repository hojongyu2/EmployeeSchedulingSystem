import React, { useState } from 'react';
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

export const CurrentVolunteerings = ({opportunity, setOpportunity}) => {

    const handleChange = (event) => {
        setOpportunity({ ...opportunity, [event.target.name]: event.target.checked });
    };

    return (
        <Container sx={{ backgroundColor: 'white', borderRadius: "10px" }}>

            <FormControl component="fieldset" required>

                <FormLabel component="legend" sx={{
                    '&.Mui-focused': {
                        color: 'black',
                    },
                    display: 'flex', flexDirection: 'row'
                }} >
                    <Typography sx={{ color:"black" }}>Which current volunteer opportunity are you interested in being contacted for?</Typography>
                    <Typography sx={{ color: 'red' }}>*</Typography>
                </FormLabel>

                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={opportunity.massCasualtyDrill} onChange={handleChange} name="massCasualtyDrill" />}
                        label="Mass Casualty Drill Thursday June 1, 2023 (11AM-3PM)"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={opportunity.sinai30th} onChange={handleChange} name="sinai30th" />}
                        label="Sinai 30th Anniversary Fundraising Gala Saturday June 17, 2023 (Time varies based on role)"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={opportunity.sinaiWellnessFair} onChange={handleChange} name="sinaiWellnessFair" />}
                        label="Sinai Wellness Fair"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={opportunity.other} onChange={handleChange} name="other" />}
                        label="Other :"
                    />
                    {opportunity.other && (
                        <TextField
                            label="Specify other activity"
                            value={opportunity.otherValue}
                            onChange={(e) => setOpportunity({ ...opportunity, otherValue: e.target.value })}
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

