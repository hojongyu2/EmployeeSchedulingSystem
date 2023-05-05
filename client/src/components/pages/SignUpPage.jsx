import { useState, useContext } from "react"
import { Form, useNavigate } from 'react-router-dom';
import { userSignUp } from "../../utilities/userAuthAxios"
import { userContext } from "../context/UserContext";

//MUI
import { Box, Button, Container, Link, TextField, Typography, useTheme } from "@mui/material"


export const SignUpPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage]= useState('');

    // Use the useContext hook to access and manage user-related state variables from the userContext.
    const {user ,setUser} = useContext(userContext)

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

                setUser(response.current_user)
                // Assumming that response.current_user will have userdata and token together, then save it in the localStorage as 'currentUser'
                // JSON.stringify is neccessary since Local storage can only store key-value pairs in which the keys and values are strings.
                localStorage.setItem('currentUser', JSON.stringify(response.current_user));
                
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
            <Form onSubmit={onSubmitForm}>
                <Box sx={{
                    backgroundColor: 'white', borderRadius: "10px",
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
                    <Button onClick={()=>{
                        navigate('/signin')
                    }} sx={{ paddingTop: "50px", color: 'black'}}>ALREADY HAVE AN ACCOUNT?</Button>
            </Form>
        </Container>
    )
}