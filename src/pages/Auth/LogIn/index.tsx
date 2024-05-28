import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { NavLink, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useGetUsersQuery } from "~/redux/api/api.caller";
import { IUserData } from "~/interfaces/user";
import { Divider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { handleUserLogin } from "~/redux/features/dashboard.slice";
import { regx } from "../config";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import sign from "jwt-encode";

const LogInForm = () => {
  const { data } = useGetUsersQuery();
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<IUserData>({
    email: "",
    password: "",
  });
  const [errMessEmail, setErrMessEmail] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");
  const dispatch = useDispatch();

  const handleInputEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, email: e.target.value });
    if (!regx.test(e.target.value)) {
      setErrMessEmail("Vui lòng nhập đúng Email!");
      return false;
    }
    setErrMessEmail("");
  };

  const handleInputPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, password: e.target.value });

    if (e.target.value) {
      setErrPassword("");
      return true;
    }
  };

  const handleValidate = () => {
    if (inputValue.email.trim()) {
      setErrMessEmail("");
      return true;
    } else {
      setErrMessEmail("Vui lòng nhập Email!");
    }
    if (!inputValue.password.trim()) {
      setErrPassword("Vui lòng nhập Password!");
      return false;
    } else {
      setErrPassword("");
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isCheckValidate = handleValidate();
    if (data) {
      if (isCheckValidate) {
        const result = data.find((item) => {
          return item.email === inputValue.email;
        });

        if (result) {
          const secret = "secret";
          const data = { email: result.email, password: result.password };
          const jwt = sign(data, secret);

          Cookies.set("userId", jwt, { expires: 7 });

          if (
            inputValue.email.length &&
            bcrypt.compareSync(inputValue.password, result.password)
          ) {
            setErrMessEmail("");
            setTimeout(() => {
              navigate("/");
              dispatch(
                handleUserLogin({
                  email: inputValue.email,
                  password: inputValue.password,
                  image: result.image,
                })
              );
            }, 1000);

            toast.success("Đăng nhập thành công!", {
              autoClose: 2000,
              position: "bottom-right",
              theme: "light",
            });
            return true;
          } else {
            setErrPassword("Mật khẩu không tồn tại!");
          }
        } else {
          setErrMessEmail("Tài khoản hoặc mật khẩu sai");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer />
      <Grid container component="main" sx={{ height: "100vh", mb: 0.5 }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?food-drink)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email/Phone"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleInputEmail}
                error={errMessEmail && errMessEmail.length ? true : false}
                helperText={errMessEmail}
              >
                {inputValue.email}
              </TextField>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputPassword}
                error={errPassword && errPassword.length ? true : false}
                helperText={errPassword}
              >
                {inputValue.password}
              </TextField>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <NavLink style={{ color: "#009688" }} to="#">
                    <Typography>Forgot password?</Typography>
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink style={{ color: "#009688" }} to="/register">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>

              <Divider sx={{ mt: 5, p: "0 50px" }}>
                <Typography
                  sx={{
                    color: "#bdbdbd",
                    fontWeight: "normal",
                    fontSize: 14,
                  }}
                >
                  Or
                </Typography>
              </Divider>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  sx={{
                    width: "49%",
                    mt: 3,
                    mb: 0,
                    bgcolor: "#4688f1",
                    "&:hover": {
                      bgcolor: "#6ebce6",
                    },
                  }}
                >
                  <GoogleIcon fontSize="medium" sx={{ mr: 2 }} />
                  Google
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "49%",
                    mt: 3,
                    mb: 0,
                    bgcolor: "#3b5998",
                    "&:hover": {
                      bgcolor: "#8b9dc3",
                    },
                  }}
                >
                  <FacebookIcon fontSize="medium" sx={{ mr: 2 }} />
                  FaceBook
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LogInForm;
