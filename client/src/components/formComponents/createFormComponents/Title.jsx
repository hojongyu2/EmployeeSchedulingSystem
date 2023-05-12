import React, { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

export const Title = ({ title, setTitle }) => {
  const [selectedValue, setSelectedValue] = useState(title || '');
  const [customTitle, setCustomTitle] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setShowOtherInput(value === 'other');
    if (value !== 'other') {
      setTitle(value);
    } else {
      setTitle(customTitle);
    }
  };

  const handleOtherInputChange = (event) => {
    const value = event.target.value;
    setCustomTitle(value);
    setTitle(value);
  };

  return (
    <Container sx={{ backgroundColor: 'white', borderRadius: '10px' }}>
      <InputLabel component="legend" sx={{ '&.Mui-focused': { color: 'black' }, display: 'flex', flexDirection: 'row' }}>
        <Typography sx={{ color: 'black' }}>Title</Typography>
        <Typography sx={{ color: 'red' }}>*</Typography>
      </InputLabel>
      <FormControl fullWidth variant="outlined" sx={{ mt: '10px', mb: '10px' }} required>
        <InputLabel htmlFor="title">Name of the event</InputLabel>
        <Select
          value={selectedValue}
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
          value={customTitle}
          onChange={handleOtherInputChange}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ pb: 1 }}
        />
      )}
    </Container>
  );
};
