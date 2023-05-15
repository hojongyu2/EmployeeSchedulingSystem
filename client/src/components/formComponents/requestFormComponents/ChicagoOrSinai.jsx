import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const ChicagoOrSinai = ({duration, setDuration}) => {

    const handleChange = (event) => {
        setDuration(event.target.value);
    };

    return (
        <>
            <p>How long will you be at Sinai or Chicago?</p>   
            <FormControl fullWidth required variant="outlined">
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
        </>
    );
}
