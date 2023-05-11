import React from "react";
import { Divider, Button, Box, TextField } from "@mui/material";
import { useForm, Controller, useFormState } from "react-hook-form";
const RegisterForm = ({ registerUser }) => {
  const { control, handleSubmit, watch } = useForm();
  const styles = {
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
    "& label": { paddingLeft: (theme) => theme.spacing(2) },
    "& input": { paddingLeft: (theme) => theme.spacing(3.5) },
    "& fieldset": {
      paddingLeft: (theme) => theme.spacing(2.5),
      borderRadius: "25px",
    },
    
  };

  const { errors } = useFormState({
    control,
  });

  const onSubmit = (data) => {
    console.log("зашёл");
    const userObj = {
      username: data.login,
      email: data.email,
      password: data.password,
    };
    registerUser(userObj);
  };

  const watcher = watch();

  return (
    <>
      <div className="overlay">
        <form
          className="login"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}
        >
          <h3 className="login__name">Register an account</h3>
          <Divider
            sx={{
              marginBottom: "55px",
              borderWidth: "2px",
              borderColor: "#fff",
            }}
          ></Divider>

          <Controller
            name="login"
            control={control}
            rules={{
              required: "Обязательное поле",
              minLength: {
                value: 4,
                message: "Minimum 4 letters in login",
              },
            }}
            render={({ field }) => {
              return (
                <TextField
                  value={field.value}
                  error={!!errors.login?.message}
                  fullWidth
                  placeholder="Enter your username"
                  label="Username"
                  helperText={errors.login?.message}
                  variant="outlined"
                  onChange={(e) => field.onChange(e)}
                  sx={styles}
                />
              );
            }}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: "Email is not correct",
              },
            }}
            render={({ field }) => {
              return (
                <TextField
                  value={field.value}
                  error={!!errors.email?.message}
                  fullWidth
                  placeholder="Enter your email"
                  label="Email"
                  helperText={errors.email?.message}
                  variant="outlined"
                  onChange={(e) => field.onChange(e)}
                  sx={styles}
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message:
                  "Your password must include minimum 8 letters and one number",
              },
            }}
            render={({ field }) => {
              return (
                <TextField
                  type="password"
                  value={field.value}
                  error={!!errors.password?.message}
                  fullWidth
                  placeholder="Enter your password"
                  label="Password"
                  helperText={errors.password?.message}
                  variant="outlined"
                  onChange={(e) => field.onChange(e)}
                  sx={styles}
                />
              );
            }}
          />

          <Box m={1} display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="outlined"
              type="submit"
              sx={{
                borderWidth: "2px",
                borderColor: "#fff",
                borderRadius: "20px",
                color: "#fff",
                background:
                  "linear-gradient(120.37deg, rgba(221, 122, 5, 0.8) 0%, rgba(236, 25, 164, 0.8) 100%);",
                maxWidth: "280px",
                width: "100%",
                height: "60px",
                fontSize: "23px",
                fontFamily: "Metrophobic",
              }}
            >
              Register
            </Button>
          </Box>
          <div className="link-wrapper forgot-wrapper">
            <a href="#" className="login__forgot">
              Forgot password?
            </a>
          </div>
          <span className="login__register">
            Already have an account? <a href="#">Login</a>{" "}
          </span>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
