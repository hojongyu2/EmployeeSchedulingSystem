import { useState, useContext } from "react"
import { Form, useNavigate } from 'react-router-dom';

//MUI
import { Box, Button, Container, TextField, Typography, useTheme } from "@mui/material"
import Year from "../formComponents/Year";
import { Email } from "../formComponents/Email";


export const EventFormPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const onChangeEmail = (e) => {
    }
    const onSubmitForm = async (e) => {
        e.preventDefault()
    }
    
    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
        }}
        >  
            <Form onSubmit={onSubmitForm}>
                <Container sx={{display:'flex', flexDirection:'column', gap:2}}>
                    <Email />
                    <Year />
                </Container>
            </Form>
        </Container>
    )
}