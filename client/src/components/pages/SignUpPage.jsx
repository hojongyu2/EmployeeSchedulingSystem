import { Box, Button, Container, Link, TextField, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import { Form } from "react-router-dom"

export const SignUpPage = () => {
    const theme = useTheme()

    const [userSignupInfo, setUserSignupInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    })
    console.log(userSignupInfo)

    const onChangeFirstName = (e) => {
        setUserSignupInfo((prevState) => ({
            ...prevState, first_name: e.target.value
        }))
    }
    const onChangeLastName = (e) => {
        setUserSignupInfo((prevState) => ({
            ...prevState, last_name: e.target.value
        }))
    }
    const onChangeEmail = (e) => {
        setUserSignupInfo((prevState) => ({
            ...prevState, email: e.target.value
        }))
    }
    const onChangePassword = (e) => {
        setUserSignupInfo((prevState) => ({
            ...prevState, password: e.target.value
        }))
    }
    const onChangePasswordConfirm = (e) => {
        setUserSignupInfo((prevState) => ({
            ...prevState, passwordConfirm: e.target.value
        }))
    }

    const onSubmitForm = async (e, userInformation) => {
        e.preventDefault()
        if (userInformation.password !== userInformation.passwordConfirm) {
            alert('password not match')
        }
        const response = await userSignupInfo(userInformation)
        console.log(response)
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
            <Form onSubmit={() => onSubmitForm(e, userInformation)}>
                <Box sx={{
                    backgroundColor: theme.palette.primary.main, borderRadius: "10px",
                }}
                >
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <TextField label="First Name" variant="outlined" sx={{ padding: "10px" }} onChange={onChangeFirstName} required></TextField>
                        <TextField label="Last Name" variant="outlined" sx={{ padding: "10px" }} onChange={onChangeLastName} required></TextField>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} textAlign={"center"} justifyContent={"center"}>
                        <TextField label="Email Address" variant="outlined" sx={{ padding: "10px" }} onChange={onChangeEmail} type="email" required></TextField>
                        <TextField label="Password" variant="outlined" sx={{ padding: "10px" }} type="password" onChange={onChangePassword} required></TextField>
                        <TextField label="PasswordConfirm" variant="outlined" sx={{ padding: "10px" }} type="password" onChange={onChangePasswordConfirm} required></TextField>
                        <Box>
                            <Button type="submit" variant="contained" sx={{ marginBottom: "10px" }}>Register</Button>
                        </Box>
                    </Box>
                </Box>
                <Typography variant="subtitle2"></Typography>
                <Link href="/">
                    <Button sx={{ paddingTop: "50px", color: 'black'}}>ALREADY HAVE AN ACCOUNT?</Button>
                </Link>
            </Form>
        </Container>
    )
}