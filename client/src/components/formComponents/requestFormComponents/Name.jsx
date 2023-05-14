import { Box, TextField, Typography } from "@mui/material"

export const Name = ({name, setName}) => {

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    return (
        <>
            <p>Name<span>*</span></p>
            <TextField value={name} onChange={onChangeName} label="Your Name" required></TextField>
        </>

    )
}