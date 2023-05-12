import { Box, TextField, Typography } from "@mui/material"

export const Name = ({name, setName}) => {

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    return (
        <Box sx={{ backgroundColor: 'white', borderRadius: "10px" }}>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                <Box display={"flex"} flexDirection={"row"} pl={1.5}>
                    <Typography>Name</Typography>
                    <Typography sx={{ color: 'red' }}>*</Typography>
                </Box>
                <TextField value={name} onChange={onChangeName} label="Your Name" variant="outlined" sx={{ padding: "10px" }} required></TextField>
            </Box>
        </Box>

    )
}