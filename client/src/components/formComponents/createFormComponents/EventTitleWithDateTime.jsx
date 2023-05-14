import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  Input,
  TextField,
} from '@mui/material';

export const EventTitleWithDateTime = ({ dateOfEvent, setDateOfEvent, startTime, setStartTime, endTime, setEndTime}) => {


  const handleDateOfEventChange = (event) => {
    setDateOfEvent(event.target.value);
    // console.log(dateOfEvent)
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
    // console.log(startTime)
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
    // console.log(endTime)
  };

  return (
    <Container sx={{borderRadius: '10px' }}>
      <Box mt={2}>
        <InputLabel htmlFor="date-of-event">Date of Event</InputLabel>
        <FormControl fullWidth>
          <Input
            id="date-of-event"
            type="date"
            value={dateOfEvent}
            onChange={handleDateOfEventChange}
            required
          />
        </FormControl>
      </Box>
      <Box mt={2}>
        <InputLabel htmlFor="start-time">Start Time</InputLabel>
        <FormControl fullWidth>
          <Input
            id="start-time"
            type="time"
            value={startTime}
            onChange={handleStartTimeChange}
            required
          />
        </FormControl>
      </Box>
      <Box mt={2} pb={2}>
        <InputLabel htmlFor="end-time">End Time</InputLabel>
        <FormControl fullWidth>
          <Input
            id="end-time"
            type="time"
            value={endTime}
            onChange={handleEndTimeChange}
            required
          />
        </FormControl>
      </Box>
    </Container>
  );
};

