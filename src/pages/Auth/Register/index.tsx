import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { IUser } from "~/interfaces/user";
import { regx } from "../config";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  useGetUsersQuery,
  useSignUpUserMutation,
} from "~/redux/api/api.caller";
// import { Divider } from "@mui/material";
import bcrypt from "bcryptjs";

const RegisterForm = () => {
  const defaultTheme = createTheme();
  const { data } = useGetUsersQuery();
  const [addUser] = useSignUpUserMutation();
  const [inputValue, setInputValue] = useState<IUser>({
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    password: "",
  });
  const [inputValueConfPassword, setInputValueConfPassword] =
    useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errMessageName, setErrMessageName] = useState<string>("");
  const [errMessagePhone, setErrMessagePhone] = useState<string>("");
  const [errMessageEmail, setErrMessageEmail] = useState<string>("");
  const [errMessageAddress, setErrMessageAddress] = useState<string>("");
  const [errMessagePass, setErrMessagePass] = useState<string>("");
  const [errMessageConfPass, setErrMessageConfPass] = useState<string>("");

  const salt = bcrypt.genSaltSync(10);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hash = bcrypt.hashSync(inputValue.password, salt);

    if (data) {
      const isEmailExist = data.find((user) => user.email === inputValue.email);
      if (!isEmailExist && inputValue && inputValueConfPassword) {
        await addUser({
          name: inputValue.name,
          phone: inputValue.phone,
          email: inputValue.email,
          address: inputValue.address,
          password: hash,
          gender: inputValue.gender,
          image: "",
        });
        alert("success!");
      } else {
        setErrMessageEmail("Tài khoản đã tồn tại!");
      }
    }

    if (!inputValue.name) {
      setErrMessageName("Name is required*");
    }
    if (!inputValue.phone) {
      setErrMessagePhone("Phone is required*");
    }
    if (!inputValue.email) {
      setErrMessageEmail("Email is required*");
    }

    if (!inputValue.address) {
      setErrMessageAddress("Password is required*");
    }
    if (!inputValue.password) {
      setErrMessagePass("Password is required*");
    }
    if (!inputValueConfPassword) {
      setErrMessageConfPass("Confirm password is required*");
    }

    console.log("dataUser:", data);
  };

  const handleInputFullName = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, name: e.target.value });
    if (Number(e.target.value)) {
      setErrMessageName("Tên nhập không đúng định dạng!");
      return true;
    } else {
      setErrMessageName("");
    }
  };

  const handleInputPhone = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, phone: e.target.value });
    if (!Number(e.target.value)) {
      setErrMessagePhone("Please value is number*");
      return false;
    }
    setErrMessagePhone("");
  };

  const handleInputEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, email: e.target.value });
    if (!regx.test(e.target.value)) {
      setErrMessageEmail("Please enter a valid email");
      return false;
    }
    setErrMessageEmail("");
  };

  const handleInputAddress = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, address: e.target.value });
    if (e.target.value) {
      setErrMessageAddress("");
      return true;
    }
  };

  const handleInputPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue({ ...inputValue, password: e.target.value });
    if (e.target.value) {
      setErrMessagePass("");
      return true;
    }
  };

  const handleConfPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValueConfPassword(e.target.value);

    if (e.target.value !== inputValue.password) {
      setErrMessageConfPass("Mật khẩu chưa khớp");
      return false;
    } else {
      setErrMessageConfPass("");
    }
  };

  const handleClickShowPassword = () => {
    return setShowPassword((show) => !show);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="fullName"
                    required
                    fullWidth
                    id="fullName"
                    label="Họ tên"
                    autoFocus
                    error={
                      errMessageName && errMessageName.length ? true : false
                    }
                    helperText={errMessageName}
                    onChange={handleInputFullName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="Phone"
                    label="Sđt"
                    name="Phone"
                    autoComplete="family-name"
                    error={
                      errMessagePhone && errMessagePhone.length ? true : false
                    }
                    helperText={errMessagePhone}
                    onChange={handleInputPhone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    error={
                      errMessageEmail && errMessageEmail.length ? true : false
                    }
                    helperText={errMessageEmail}
                    onChange={handleInputEmail}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Địa Chỉ"
                    type="address"
                    id="address"
                    autoComplete="address"
                    error={
                      errMessageAddress && errMessageAddress.length
                        ? true
                        : false
                    }
                    helperText={errMessageAddress}
                    onChange={handleInputAddress}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    error={
                      errMessagePass && errMessagePass.length ? true : false
                    }
                    helperText={errMessagePass}
                    onChange={handleInputPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="ConfirmPassword"
                    label="Nhập lại mật khẩu"
                    type={showPassword ? "text" : "password"}
                    id="ConfirmPassword"
                    autoComplete="ConfirmPassword"
                    error={
                      errMessageConfPass && errMessageConfPass.length
                        ? true
                        : false
                    }
                    helperText={errMessageConfPass}
                    onChange={handleConfPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link style={{ color: "#009688" }} to="/login">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RegisterForm;
