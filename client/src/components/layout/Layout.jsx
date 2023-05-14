import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container, useTheme } from "@mui/material";

export default function Layout() {
    const theme = useTheme()
    return (
        <> 
            <Header />
            <Outlet />
        </>
    )
}