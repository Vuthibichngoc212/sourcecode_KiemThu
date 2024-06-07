import CreateIcon from "@mui/icons-material/Create";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  IconButton,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const MyAccount = () => {
  return (
    <Box
      className="App"
      sx={{
        maxWidth: "500px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        margin: "20px auto",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Thông tin tài khoản
      </Typography>

      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.light" }} />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{
              position: "absolute",
              padding: "1px",
              marginLeft: "38px",
              marginTop: "42px",
              backgroundColor: "background.paper",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: "primary.main",
            }}
          >
            <input hidden accept="image/*" type="file" />
            <CreateIcon sx={{ width: "10px", height: "10px" }} />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          label="Họ & Tên"
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Nickname"
          variant="outlined"
        />
        <FormControl component="fieldset" margin="normal">
          <RadioGroup row aria-label="gender" name="gender">
            <FormControlLabel value="male" control={<Radio />} label="Nam" />
            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
            <FormControlLabel value="other" control={<Radio />} label="Khác" />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="country-label">Quốc tịch</InputLabel>
          <Select
            labelId="country-label"
            label="Quốc tịch"
            value=""
            onChange={() => {}}
          >
            <MenuItem value="Vietnam">Việt Nam</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" sx={{ marginTop: "20px" }}>
          Lưu thay đổi
        </Button>
      </form>
    </Box>
  );
};

export default MyAccount;
