import { FormControl, TextField } from "@mui/material"

export const Email = ({email, setEmail}) => {

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    return (
        <>
            <p>Email<span>*</span></p>
            <FormControl fullWidth required>
                <TextField value={email} onChange={onChangeEmail} type="email" label="Your Email" required></TextField>
            </FormControl>
        </>

    )
}