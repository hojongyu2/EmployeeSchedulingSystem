import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box, Container, useTheme } from "@mui/material";

export default function Layout() {
    const theme = useTheme()
    return (
        <Container sx={{backgroundColor: theme.palette.primary.main}}> 
            <Box>
                <Header />
            </Box>
            <div style={{padding:'50px'}}>
                <Outlet />
            </div>
        </Container>
    )
}