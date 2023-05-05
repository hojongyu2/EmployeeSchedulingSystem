import { Box, TextField, Typography } from "@mui/material"

export const Email = () => {
    return (
        <Box sx={{ backgroundColor: 'white', borderRadius: "10px" }}>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
                <Box display={"flex"} flexDirection={"row"} pl={1.5}>
                    <Typography>Email</Typography>
                    <Typography sx={{ color: 'red' }}>*</Typography>
                </Box>
                <TextField label="Email" variant="outlined" sx={{ padding: "10px" }} required></TextField>
            </Box>
        </Box>

    )
}