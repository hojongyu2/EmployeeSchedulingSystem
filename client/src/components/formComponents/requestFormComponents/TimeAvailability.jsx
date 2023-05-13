import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Slider,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const marks = [
  { value: 0, label: '12 AM' },
  { value: 6, label: '6 AM' },
  { value: 12, label: '12 PM' },
  { value: 18, label: '6 PM' },
  { value: 24, label: '12 AM' },
];

export const TimeAvailability = ({selectedTimes, setSelectedTimes}) => {

  const [disabledDays, setDisabledDays] = useState({});

  const handleTimeChange = (day, newTimes) => {
    setSelectedTimes({ ...selectedTimes, [day]: newTimes });
    // console.log(selectedTimes)
  };

  const handleNAChange = (day, isChecked) => {
    setDisabledDays({ ...disabledDays, [day]: isChecked });
    setSelectedTimes({ ...selectedTimes, [day]: isChecked ? false : [0, 24] });
    // console.log(selectedTimes)
  };

  const formatHours = (value) => {
    const hours = value < 12 ? value : value === 24 ? 0 : value - 12;
    const period = value < 12 ? 'AM' : 'PM';
    return `${hours} ${period}`;
  };

  return (
    <Container sx={{ backgroundColor: 'white', borderRadius: "10px" }}>
        <Box display={"flex"} flexDirection={"row"}>
            <Typography sx={{ color:"black" }}>What times are you available?</Typography>
            <Typography sx={{ color: 'red' }}>*</Typography>
        </Box>
      {days.map((day) => (
        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} gap={3} key={day} sx={{ my: 2 }}>
          <Typography>{day}</Typography>
          <Slider
            value={selectedTimes[day] || [0, 23.59]}
            onChange={(_, newTimes) => handleTimeChange(day, newTimes)}
            valueLabelDisplay="auto"
            valueLabelFormat={formatHours}
            marks={marks}
            step={1}
            min={0}
            max={23.59}
            disabled={disabledDays[day]}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={disabledDays[day] || false}
                onChange={(e) => handleNAChange(day, e.target.checked)}
              />
            }
            label="N/A"
          />
        </Box>
      ))}
    </Container>
  );
}
