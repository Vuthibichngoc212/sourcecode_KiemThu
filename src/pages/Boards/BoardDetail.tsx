import { Container } from "@mui/material";
import AppBar from "~/component/AppBar";
import BoardBar from "./BoardBar";
import Footer from "~/component/Footer";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

function Board() {
  return (
    // <Routes>
    <Container disableGutters maxWidth={false}>
      <Box
        sx={{
          display: "block",
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.32))",
          zIndex: 100,
        }}
      >
        <AppBar />
        <BoardBar />
      </Box>
      <Outlet />

      <Footer />
    </Container>
    // </Routes>
  );
}

export default Board;
