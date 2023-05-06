import React, { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

export const ChicagoOrSinai = ({duration, setDuration}) => {

    const handleChange = (event) => {
        setDuration(event.target.value);
    };

    return (
        <Container sx={{ backgroundColor: 'white', borderRadius: "10px" }}>
                <InputLabel htmlFor="duration" sx={{ color:"black" }}>How long will you be at Sinai or Chicago?</InputLabel>   
                <FormControl fullWidth variant="outlined" sx={{mt:'10px' ,mb:'10px'}}>
                    <InputLabel htmlFor="duration">Select your duration of stay</InputLabel>
                    <Select
                        value={duration}
                        onChange={handleChange}
                        label="How long will you be at Sinai or Chicago?"
                        inputProps={{
                            name: 'duration',
                            id: 'duration',
                        }}
                    >
                        <MenuItem value="<1 month">{'<1 month'}</MenuItem>
                        <MenuItem value="1-3 months">1-3 months</MenuItem>
                        <MenuItem value="3-6 months">3-6 months</MenuItem>
                        <MenuItem value="6-12 months">6-12 months</MenuItem>
                        <MenuItem value=">12 months">{'>12 months'}</MenuItem>
                    </Select>
                </FormControl>
        </Container>
    );
}
