import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Container } from '@mui/material';

export default function TimePickerForActivity({ onTimeChange, initialStartTime, initialEndTime }) {
  const [start, setStart] = React.useState(dayjs(initialStartTime, 'HH:mm'));
  const [end, setEnd] = React.useState(dayjs(initialEndTime, 'HH:mm'));

  const handleStartTimeChange = (newValue) => {
    setStart(newValue);
    onTimeChange && onTimeChange(newValue.format('HH:mm'), end.format('HH:mm'));
  };
  
  const handleEndTimeChange = (newValue) => {
    setEnd(newValue);
    onTimeChange && onTimeChange(start.format('HH:mm'), newValue.format('HH:mm'));
  };
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <TimePicker
          label="Controlled picker"
          value={start}
          onChange={handleStartTimeChange}
        />
        <TimePicker
          label="Controlled picker"
          value={end}
          onChange={handleEndTimeChange}
        />
      </Container>
    </LocalizationProvider>
  );
}
