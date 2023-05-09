import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { useState } from "react"

export const EventFormList = () => {
    const [state, setState] = useState(false)
    const [state1, setState1] = useState(false)
    const onClickOpen1 = (e) => {
        e.preventDefault()
        setState(() => !state)
        console.log(state)
    }
    const onClickOpen2 = (e) => {
        e.preventDefault()
        setState1(() => !state1)
        console.log(state1)
    }

    const [year, setYear]= useState(null)
    const [state2, setState2] = useState(false)
    const handleChange = (event) => {
        const value = event.target.value;
        setYear(value)
        setState2(true)
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            <Button onClick={onClickOpen1} sx={{ backgroundColor: 'white', color: 'black', borderRadius: "10px", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography>Title: event 1</Typography>
                <Typography>Created by : Anonymous</Typography>
                <Typography>Event date : Friday 04 MAY 2023 </Typography>
            </Button>
            {state && (
                <Container>
                    <Box sx={{ backgroundColor: 'white', color: 'black', borderRadius: "10px", display: 'flex', flexDirection: 'column' }}>
                        <Typography>Total number of recipients : 200</Typography>
                        <Typography>Total responses : 100</Typography>
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
                                <MenuItem value="bloodDrive">Blood Drive</MenuItem>
                                <MenuItem value="clinic">Clinic</MenuItem>
                            </Select>
                        </FormControl>
                    {state2 && (
                        <Box>
                            <Typography>student1 is available for {year}</Typography>
                            <Typography>student2 is available for {year}</Typography>
                            <Typography>student3 is available for {year}</Typography>
                        </Box>
                    )}
                    </Box>
                </Container>
            )}
            <Button onClick={onClickOpen2} sx={{ backgroundColor: 'white', color: 'black', borderRadius: "10px", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography>Title: event 2</Typography>
                <Typography>Created by : Anonymous</Typography>
                <Typography>Event date : Friday 04 MAY 2023 </Typography>
            </Button>
            {state1 && (
                <Container>
                    <Box sx={{ backgroundColor: 'white', color: 'black', borderRadius: "10px", display: 'flex', flexDirection: 'column' }}>
                        <Typography>Available personel : 200</Typography>
                        <Typography>Available personel : 20</Typography>
                    </Box>
                </Container>
            )}
            <Button sx={{ backgroundColor: 'white', color: 'black', borderRadius: "10px", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography>Title: event 3</Typography>
                <Typography>Created by : Anonymous</Typography>
                <Typography>Event date : Friday 04 MAY 2023 </Typography>
            </Button>
            <Button sx={{ backgroundColor: 'white', color: 'black', borderRadius: "10px", display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography>Title: event 4</Typography>
                <Typography>Created by : Anonymous</Typography>
                <Typography>Event date : Friday 04 MAY 2023 </Typography>
            </Button>

        </Container>
    )
}