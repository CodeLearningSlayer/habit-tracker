import "./loginForm.scss"
import React, {useState} from 'react';
import { TextField, Divider, Button, Box } from "@mui/material";
import InputField from "../inputField/InputField";

const LoginForm = ({loginHandle}) => { // перенести обращение к серверу наверх

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (type) => (e) => {
        switch (type) {
            case "login":
                setLogin(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            default:
                return
        }

    }

    return (
        <>
            <form className="login" onSubmit={async (e) => {
                e.preventDefault();
                const userObj = {
                    username: login,
                    password
                }
                const res = await fetch("http://localhost:3010/api/auth/login", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(userObj)
                })
                let result = await res.json();
                console.log(result);
            }}>
                <h3 className="login__name">Login to account</h3>
                <Divider sx={{marginBottom: "55px", borderWidth: "2px", borderColor: "#fff"}}></Divider>
                
                <InputField changeField="login" 
                    handleChange={handleChange} 
                    label="Username"
                    type="text" 
                    placeholder="Enter username" 
                    value={login}/>
                
                <InputField changeField="password" 
                    handleChange={handleChange} 
                    label="Password" 
                    placeholder="Enter password" 
                    type="password"
                    value={password}/>

                <Box
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                >
                    <Button variant="outlined" 
                    type="submit"
                    sx={{
                    borderWidth: "2px",
                    borderColor: "#fff",
                    borderRadius: "20px",
                    color: '#fff', 
                    background: 'linear-gradient(120.37deg, rgba(221, 122, 5, 0.8) 0%, rgba(236, 25, 164, 0.8) 100%);',
                    maxWidth: "280px",
                    width:"100%",
                    height: "60px",
                    fontSize: "23px",
                    fontFamily: "Metrophobic"}}
                    >
                        Log in
                    </Button>
                </Box>
                <div className="link-wrapper forgot-wrapper">
                    <a href="#" className="login__forgot">Forgot password?</a>
                </div>
            <span className="login__register">Don't have account? <a href="#">Create Account</a> </span>
            </form>
        </>
        
    );
};

export default LoginForm;