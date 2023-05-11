import React from 'react';
import { TextField } from '@mui/material';
const InputField = ({value, error, type, handleChange, changeField, label, placeholder, helper}) => {
    return (
        <TextField required 
                    value={value}
                    error={error}
                    fullWidth
                    label={label}
                    type={type}
                    placeholder={placeholder}
                    helperText={helper}
                    variant="outlined"
                    onChange={handleChange(`${changeField}`)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            color:"#fff",
                            "& > fieldset": { borderColor: "#EFEFEF", borderWidth: "2px", transition: "all .3s" },
                            "& > fieldset:focus" : {
                              borderColor: "red"
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#C8FFBE',
                            },
                        },
                        "& .MuiOutlinedInput-root:hover": {
                            "& > fieldset": {
                              borderColor: "#fff !important"
                            }
                        },
                        "& .MuiFormLabel-root":{
                          color: "#fff !important"
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