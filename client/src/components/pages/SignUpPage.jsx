import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { userSignUp } from "../../utilities/userAuthAxios"
import { Box, Button, Container, Link, TextField, Typography, useTheme } from "@mui/material"

export const SignUpPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage]= useState('');

    const [userSignupInfo, setUserSignupInfo] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password1: "",
        password2: "",
    })

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
            ...prevState, password1: e.target.value
        }))
    }
    const onChangePasswordConfirm = (e) => {
        setUserSignupInfo((prevState) => ({
            ...prevState, password2: e.target.value
        }))
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const response = await userSignUp(userSignupInfo)
            if(response.detail === 'User registered and logged in successfully.'){
                navigate('/')
            }
        } catch (e) {
            setErrorMessage('"ERROR! Sorry the credentials you are using are invalid" ')
        }
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
            <form onSubmit={onSubmitForm}>
                <Box sx={{
                    backgroundColor: theme.palette.primary.main, borderRadius: "10px",
                }}
                >
                    <Typography sx={{color:'red', textAlign:'center'}}>{errorMessage}</Typography>
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
            </form>
        </Container>
    )
}