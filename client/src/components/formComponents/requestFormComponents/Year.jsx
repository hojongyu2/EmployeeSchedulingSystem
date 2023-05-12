import React, { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

export const Year = ({ year, setYear }) => {
  const [selectedValue, setSelectedValue] = useState(year || '');
  const [customYear, setCustomYear] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    setShowOtherInput(value === 'other');
    if (value !== 'other') {
      setYear(value);
    } else {
      setYear(customYear);
    }
  };

  const handleOtherInputChange = (event) => {
    const value = event.target.value;
    setCustomYear(value);
    setYear(value);
  };

  return (
    <Container sx={{ backgroundColor: 'white', borderRadius: '10px' }}>
      <InputLabel component="legend" sx={{ '&.Mui-focused': { color: 'black' }, display: 'flex', flexDirection: 'row' }}>
        <Typography sx={{ color: 'black' }}>Year</Typography>
        <Typography sx={{ color: 'red' }}>*</Typography>
      </InputLabel>
      <FormControl fullWidth variant="outlined" sx={{ mt: '10px', mb: '10px' }} required>
        <InputLabel htmlFor="duration">Select year</InputLabel>
        <Select
          value={selectedValue}
          onChange={handleChange}
          label="Year"
          inputProps={{
            name: 'year',
            id: 'year',
          }}
        >
          <MenuItem value="m3">M3</MenuItem>
          <MenuItem value="m4">M4</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
      {showOtherInput && (
        <TextField
          label="Specify other year"
          value={customYear}
          onChange={handleOtherInputChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      )}
    </Container>
  );
};
