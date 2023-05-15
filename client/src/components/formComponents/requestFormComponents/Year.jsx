import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

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
    <>
      <p>Year<span>*</span></p>
      <FormControl fullWidth required>
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
          fullWidth
        />
      )}
    </>
  );
};
