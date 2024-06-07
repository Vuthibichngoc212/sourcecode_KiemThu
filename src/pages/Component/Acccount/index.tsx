import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleUserLogout,
  userSelector,
} from "~/redux/features/dashboard.slice";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Logout } from "@mui/icons-material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Cookies from "js-cookie";

const Account = () => {
  const dispatch = useDispatch();
  const users = useSelector(userSelector);
  const navigate = useNavigate();
  // const userChecked = users.map((user) => user.image);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await Cookies.remove("userId");
    dispatch(handleUserLogout());
    navigate("/login");
  };
  const handleMyAccount = () => {
    navigate("/account");
  };

  return (
    <>
      {users.length === 0 ? (
        <Box
          sx={{
            display: "inline-block",
            alignItems: "center",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <NavLink
            style={{
              color: "black",
              textDecoration: "none",
            }}
            to="/login"
          >
            <Tooltip title="Account setting">
              <PersonOutlinedIcon
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "80px",
                }}
                fontSize="medium"
              />
            </Tooltip>
            <Typography>Sign In</Typography>
          </NavLink>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Tooltip title="Account setting">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2, mr: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                {users &&
                  users.map((user, index) => (
                    <Avatar
                      key={index}
                      sx={{ width: 35, height: 35 }}
                      src={user.image}
                      alt="/"
                    />
                  ))}
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button-profiles",
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleMyAccount}>
              <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Thông tin tài
              khoản
            </MenuItem>
            <MenuItem>
              <Avatar sx={{ width: 28, height: 28, mr: 2 }} /> Đơn hàng của tôi
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <SupportAgentIcon fontSize="small" />
              </ListItemIcon>
              Trung tâm hộ trợ
            </MenuItem>
            {/* <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
};

export default Account;
