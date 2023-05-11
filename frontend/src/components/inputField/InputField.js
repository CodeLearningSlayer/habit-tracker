import React from 'react';
import { TextField } from '@mui/material';
const InputField = ({value, error, type, handleChange, changeField, label, placeholder, helper}) => {
    return (
        <TextField required 
                    value={value}
                    error={error}
                    fullWidth
                    placeholder={placeholder} 
                    label={label}
                    type={type}
                    helperText={helper}
                    variant="outlined"
                    onChange={handleChange(`${changeField}`)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& > fieldset": { borderColor: "#EFEFEF", borderWidth: "2px", transition: "all .3s" },
                        },
                        "& .MuiOutlinedInput-root:hover": {
                            "& > fieldset": {
                              borderColor: "#fff"
                            }
                        },
                        borderColor: "#fff",
                        borderWidth: "2px",
                        marginBottom: "25px",
                        '& label': { paddingLeft: (theme) => theme.spacing(2) },
                        '& input': { paddingLeft: (theme) => theme.spacing(3.5) },
                        '& fieldset': {
                          paddingLeft: (theme) => theme.spacing(2.5),
                          borderRadius: '25px',
                        },
                      }}></TextField>
    );
};

export default InputField;