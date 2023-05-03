import { Box, Button, Container, Link, TextField, useTheme } from "@mui/material"
import { useState } from "react"
import { Form } from "react-router-dom"

export const LoginPage = () => {
    // MUI theme
    const theme = useTheme()
    
    const [userEmailAndPassword, setUserEmailAndPassword] = useState({
        email: "",
        password: "",
    })
    console.log(userEmailAndPassword)
    const onChangeEmail = (e) => {
        setUserEmailAndPassword(
            (prevState) => ({...prevState, email:e.target.value})
            )
    }

    const onChangePassword = (e) => {
        setUserEmailAndPassword(
            (prevState) => ({...prevState, password:e.target.value})
            )
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
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
                <Box sx={{
                    backgroundColor: theme.palette.primary.main, borderRadius: "10px",
                }}
                >
                    <Box display={"flex"} flexDirection={"column"} spacing={2} justifyContent={"center"}>
                        <TextField onChange={onChangeEmail} label="Email Address" variant="outlined" sx={{ padding: "10px" }} required></TextField>
                        <TextField onChange={onChangePassword} label="Password" variant="outlined" sx={{ padding: "10px" }} required></TextField>
                    </Box>
                    <Box display={"flex"} direction={"row"} textAlign={"center"} justifyContent={"center"} p={4}>
                        <Button type="submit" variant="contained">Log In</Button>
                        <Button disabled>Or</Button>
                        <Link href="/signup" sx={{textDecoration:'none'}}>
                            <Button variant="contained">Create Account</Button>
                        </Link>
                    </Box>
                </Box>
            </Form>
        </Container>
    )
}