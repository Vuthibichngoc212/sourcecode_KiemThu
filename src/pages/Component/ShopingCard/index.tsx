import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CartList from "~/component/AppBar/Menu/cartList";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { handleAppearCart, isAppear } from "~/redux/features/dashboard.slice";
import { useDispatch, useSelector } from "react-redux";

const ShopingCard = () => {
  const ischecked = useSelector(isAppear);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const iconRef = useRef(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    dispatch(handleAppearCart(!ischecked));
  };
  const handleClose = (): void => {
    setAnchorEl(null);
    dispatch(handleAppearCart(!ischecked));
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account setting">
          <IconButton
            id="shopingCard"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            ref={iconRef}
          >
            <ShoppingCartOutlinedIcon
              sx={{
                display: "flex",
                alignItems: "center",
                width: "30px",
                height: "30px",
              }}
              fontSize="medium"
            />
          </IconButton>
        </Tooltip>
      </Box>
      {ischecked && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
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
          <Box
            sx={{
              display: "block",
              alignItem: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }} variant="h6" gutterBottom>
              GIỎ HÀNG
            </Typography>
          </Box>
          <Divider />
          <CartList />
        </Menu>
      )}
    </>
  );
};

export default ShopingCard;
