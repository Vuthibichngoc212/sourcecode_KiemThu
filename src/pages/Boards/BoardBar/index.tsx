import Box from "@mui/material/Box";
import Workspaces from "~/component/AppBar/Menu/workspaces";
import { NavLink } from "react-router-dom";

import { menuList } from "./config";
import { Button } from "@mui/material";

const BoardBar = () => {
  return (
    <Box
      px={49}
      sx={{
        height: "55px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "White",
      }}
    >
      <Box
        sx={{
          pl: "5px",
        }}
      >
        <Workspaces />
      </Box>

      <Box>
        {menuList.map((menuItem) => (
          <Button
            key={menuItem.id}
            sx={{
              mr: 2,
              width: "7rem",
              height: "40px",
              overflow: "hidden",
              textAlign: "center",
              p: 0,
              "&:hover": {
                bgcolor: "primary.light",
              },
            }}
          >
            <NavLink
              style={({ isActive }) => ({
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                // color: "black",
                backgroundColor: isActive ? "#4db6ac" : "",
                color: isActive ? "#fff" : "black",
              })}
              to={`${menuItem.path}`}
            >
              {menuItem.title}
            </NavLink>
          </Button>
        ))}
      </Box>
    </Box>
  );
};
export default BoardBar;
