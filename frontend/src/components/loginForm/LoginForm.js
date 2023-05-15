import "./loginForm.scss"
import React, {useState} from 'react';
import { TextField, Divider, Button, Box } from "@mui/material";
import InputField from "../inputField/InputField";

const LoginForm = ({loginHandle, handleChangeModal}) => { // перенести обращение к серверу наверх

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
        <div className="overlay">
            <form className="login" onSubmit={(e) => {
                e.preventDefault();
                loginHandle({login, password});
            }}>
                    <h3 className="login__name">Login to account</h3>
                    <Divider sx={{marginBottom: "55px", borderWidth: "2px", borderColor: "#fff"}}></Divider>
                    
                    <InputField changeField="login" 
                        handleChange={handleChange} 
                        label="Username"
                        type="text" 
                        placeholder="Enter username" 
                        value={login}
                        
                        />
                    
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
                        <div href="#" className="login__forgot">Forgot password?</div>
                    </div>
                <span className="login__register">Don't have account? <div onClick={handleChangeModal} style={{display: "inline", color:"red", cursor:"pointer", fontWeight: 700}}>Create Account</div> </span>
            </form>
        </div>
           
        </>
        
    );
};

export default LoginForm;