import { Box, Button, Container, Typography } from "@mui/material"
import { useState } from "react"

export const VolunteerNumberForActivity = ({ onVolunteerNumberChange }) => {

    const [volunteerNumber, setVolunteerNumber] = useState(0)

    const handleOnClickMinus = () => {
      if (volunteerNumber > 0){
        setVolunteerNumber(volunteerNumber - 1);
        onVolunteerNumberChange(volunteerNumber - 1);
      }
    };

    const handleOnClickPlus = () => {
      setVolunteerNumber(volunteerNumber + 1);
      onVolunteerNumberChange(volunteerNumber + 1);
    };


    return (
        <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <Typography>Number of volunteers needed:</Typography>
            <Button onClick={handleOnClickMinus} sx={{color:'black'}}>-</Button>
            {volunteerNumber}
            <Button onClick={handleOnClickPlus} sx={{color:'black'}}>+</Button>
        </Box>
    )
}