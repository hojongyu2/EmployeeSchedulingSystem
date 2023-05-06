import React, { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

export const Year = ({year, setYear}) => {

    const [showOtherInput, setShowOtherInput] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        setYear(value);
        setShowOtherInput(value === 'other');
    };

    const handleOtherInputChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <Container sx={{ backgroundColor: 'white', borderRadius: "10px" }}>
            <InputLabel component="legend" sx={{ '&.Mui-focused': { color: 'black' }, display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ color:"black" }}>Year</Typography>
                <Typography sx={{ color: 'red' }}>*</Typography>
            </InputLabel>
            <FormControl fullWidth variant="outlined" sx={{ mt: '10px', mb: '10px' }} required>
                <InputLabel htmlFor="duration">Select year</InputLabel>
                <Select
                    value={year}
                    onChange={handleChange}
                    label="Year"
                    inputProps={{
                        name: 'year',
                        id: 'year',
                    }}
                >
                    <MenuItem value="m1">M1</MenuItem>
                    <MenuItem value="m2">M2</MenuItem>
                    <MenuItem value="m3">M3</MenuItem>
                    <MenuItem value="m4">M4</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
            {showOtherInput && (
                <TextField
                    label="Specify other year"
                    value={year !== 'other' ? year : ''}
                    onChange={handleOtherInputChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                />
            )}
        </Container>
    );
}
