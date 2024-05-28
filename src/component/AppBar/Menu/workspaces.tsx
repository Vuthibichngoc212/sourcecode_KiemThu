import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { MenuList, Paper } from "@mui/material";
import { useGetCategoryQuery } from "~/redux/api/api.caller";
import { NavLink } from "react-router-dom";

const Workspaces = () => {
  const { data } = useGetCategoryQuery();
  // console.log(data);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Button
          sx={{ float: "left", cursor: "pointer" }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? true : undefined}
          onClick={handleClick}
        >
          {anchorEl === null ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MenuIcon fontSize="large" />
            </Box>
          ) : (
            <Box sx={{ cursor: "pointer", zIndex: 1000 }}>
              <CloseIcon fontSize="large" />
            </Box>
          )}
        </Button>

        <Paper sx={{ width: 120, maxWidth: "100%", zIndex: 10 }}>
          <Menu
            sx={{ marginTop: 0.8 }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            {data && (
              <MenuList sx={{ width: 190, maxWidth: "100%" }}>
                {data.map((item, index) => (
                  <MenuItem key={index} onClick={handleClose}>
                    <img
                      src={item.image}
                      style={{ width: 20, height: 20, marginRight: 5 }}
                    />
                    <NavLink
                      style={{ textDecoration: "none", color: "black" }}
                      to="/products"
                    >
                      {item.title}
                    </NavLink>
                  </MenuItem>
                ))}
              </MenuList>
            )}
          </Menu>
        </Paper>
      </Box>
    </>
  );
};

export default Workspaces;
