import * as React from 'react';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box, TextField, Typography } from '@mui/material';

export default function Year() {
  const [selectedOption, setSelectedOption] = useState('M4');
  const [otherValue, setOtherValue] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <FormControl sx={{ p: '10px', backgroundColor: 'white', borderRadius: "10px" }}>
      <Box display={'flex'} flexDirection={'row'}>
        <FormLabel
          id="demo-radio-buttons-group-label"
          sx={{
            '&.Mui-focused': {
              color: 'inherit', // This will set default color and prevent from blinking when other radio button is clicked.
            },
          }}
        >
          Year
        </FormLabel>
        <Typography sx={{ color: 'red' }}>*</Typography>
      </Box>
      <RadioGroup
        value={selectedOption}
        onChange={handleOptionChange}
        name="radio-buttons-group"
      >
        <FormControlLabel value="M1" control={<Radio />} label="M1" />
        <FormControlLabel value="M2" control={<Radio />} label="M2" />
        <FormControlLabel value="M3" control={<Radio />} label="M3" />
        <FormControlLabel value="M4" control={<Radio />} label="M4" />
        <FormControlLabel value="Other" control={<Radio />} label="Other:" />
      </RadioGroup>
      {selectedOption === 'Other' && (
        <TextField
          label="Specify other year"
          value={otherValue}
          onChange={(e) => setOtherValue(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
        />
      )}
    </FormControl>
  );
}
