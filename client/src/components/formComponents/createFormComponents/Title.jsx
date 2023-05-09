import React, { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

export const Title = ({title, setTitle}) => {

    const [showOtherInput, setShowOtherInput] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
        setShowOtherInput(value === 'other');
    };

    const handleOtherInputChange = (event) => {
        setTitle(event.target.value);
    };

    return (
        <Container sx={{ backgroundColor: 'white', borderRadius: "10px" }}>
            <InputLabel component="legend" sx={{ '&.Mui-focused': { color: 'black' }, display: 'flex', flexDirection: 'row' }}>
                <Typography sx={{ color:"black" }}>Title</Typography>
                <Typography sx={{ color: 'red' }}>*</Typography>
            </InputLabel>
            <FormControl fullWidth variant="outlined" sx={{ mt: '10px', mb: '10px' }} required>
                <InputLabel htmlFor="title">Name of the event</InputLabel>
                <Select
                    value={title}
                    onChange={handleChange}
                    label="title"
                    inputProps={{
                        name: 'title',
                        id: 'title',
                    }}
                >
                    <MenuItem value="Mass Casualty Drill">Mass Casualty Drill</MenuItem>
                    <MenuItem value="Sinai Wellness Fair">Sinai Wellness Fair</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
            {showOtherInput && (
                <TextField
                    label="Specify other title"
                    value={title !== 'other' ? title : ''}
                    onChange={handleOtherInputChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                />
            )}
        </Container>
    );
}
