import { Box, Button, Container, Link, TextField, Typography, useTheme } from "@mui/material"
import { useState, useContext } from "react"
import { Form, useNavigate } from "react-router-dom"
import { userLogIn } from "../../utilities/userAuthAxios"
import { userContext } from "../context/UserContext"


export const LoginPage = () => {
    // MUI theme
    const theme = useTheme()
    const navigate = useNavigate()
    const {user ,setUser} = useContext(userContext)
    const [errorMessage, setErrorMessage]= useState('');
    const [userEmailAndPassword, setUserEmailAndPassword] = useState({
        email: "",
        password: "",
    })

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

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const response = await userLogIn(userEmailAndPassword)
        if(response.detail === 'Logged in successfully'){
            setUser(response.current_user)
            navigate('/')
        } else {
            setErrorMessage(response)
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
                    backgroundColor:'white', borderRadius: "10px",
                }}
                >
                    <Typography sx={{color:'red', textAlign:'center'}}>{errorMessage}</Typography>
                    <Box display={"flex"} flexDirection={"column"} spacing={2} justifyContent={"center"}>
                        <TextField onChange={onChangeEmail} type="email" label="Email Address" variant="outlined" sx={{ padding: "10px" }} required></TextField>
                        <TextField onChange={onChangePassword}  type="password" label="Password" variant="outlined" sx={{ padding: "10px" }} required></TextField>
                    </Box>
                    <Box display={"flex"} direction={"row"} textAlign={"center"} justifyContent={"center"} p={4}>
                        <Button type="submit" variant="contained">Log In</Button>
                        <Button disabled>Or</Button>
                        {/* <Link href="/signup" sx={{textDecoration:'none'}}> */}
                            <Button onClick={()=>{
                        navigate('/signup')
                    }} variant="contained">Create Account</Button>
                        {/* </Link> */}
                    </Box>
                </Box>
            </Form>
        </Container>
    )
}