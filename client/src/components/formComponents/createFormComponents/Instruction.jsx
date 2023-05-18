import { TextField } from "@mui/material"

export const Instruction = ({instruction, setInstruction}) => {
    
    const onChangeInstuction = (e) => {
        setInstruction(e.target.value)
    };

    return (
        <>
            <p>Write your instruction here :</p>
            <TextField value={instruction} onChange={onChangeInstuction} label="Instruction" fullWidth multiline></TextField>
        </>
    )
}