import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ReactComponent as LogoIcon } from "~/assets/logo.svg";
import SvgIcon from "@mui/material/SvgIcon";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import { DivStyled } from "./styled";

const bgColor = grey[200];

const Footer = () => {
  return (
    <Box
      pl={50}
      pr={41}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "40vh",
        bgcolor: bgColor,
      }}
    >
      <Box
        sx={{
          display: "block",
          alignItems: "center",

          width: 300,
          mr: 2,
          ml: 1,
        }}
      >
        <SvgIcon
          component={LogoIcon}
          inheritViewBox
          sx={{
            width: "14vw",
            height: "25vh",
            transform: "translateY(-20%)",
          }}
        />
        <Box
          px={6}
          sx={{ width: 380, transform: "translateY(-100px) translateX(-10%)" }}
        >
          <Typography>
            &emsp; SOFRESH đồng hành và hỗ trợ nông sản Việt, mang đến cho khách
            hàng thực phẩm “3 Sạch” : Sạch từ nông trại - Sạch qua quá trình sơ
            chế, chế biến - Sạch đến bàn ăn.
          </Typography>
          <Typography>
            &emsp; 8 siêu thị và một xưởng sản xuất thực phẩm hoạt động trên địa
            bàn TP. Hà Nội phục vụ thực phẩm tươi, sạch, đảm bảo chất lượng và
            an toàn.
          </Typography>
        </Box>
      </Box>
      <Box pt={8} sx={{ textAlign: "center" }}>
        <Typography variant="h5"> Hệ thống cửa hàng</Typography>
        <Link to="/">
          <img
            style={{ width: 120, paddingTop: 20 }}
            src="https://file.hstatic.net/200000460455/file/map_fcd79b482a614d2a99822d0b2c5d3567.png"
          />
        </Link>
      </Box>
      <Box pt={8} sx={{}}>
        <Typography variant="h5">Hỗ trợ khách hàng</Typography>
        <ul>
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <DivStyled>Giới thiệu</DivStyled>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <DivStyled>Liên hệ</DivStyled>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <DivStyled>Chính sách đổi trả</DivStyled>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <DivStyled>Chính sách bảo mật</DivStyled>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <DivStyled>Chính sách giao hàng</DivStyled>
            </Link>
          </li>
        </ul>
      </Box>
      <Box pt={8} sx={{ mr: 0 }}>
        <Typography variant="h5"> Liên hệ chúng tôi </Typography>
        <Box pt={2} sx={{ display: "flex", justifyContent: "space-around" }}>
          <CallOutlinedIcon fontSize="large" />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            098 765 4321
          </Typography>
        </Box>

        <Box pt={3} sx={{ justifyContent: "space-between" }}>
          <Tooltip title="Email">
            <Button
              variant="outlined"
              sx={{ width: "auto", pl: 0, pr: 0, borderRadius: "10px" }}
            >
              <MailIcon sx={{ p: 0 }} fontSize="large" />
            </Button>
          </Tooltip>

          <Tooltip title="Facebook">
            <Button
              variant="outlined"
              sx={{
                width: "auto",
                pl: 0,
                pr: 0,
                ml: "5px",
                borderRadius: "10px",
              }}
            >
              <FacebookIcon sx={{ p: 0 }} fontSize="large" />
            </Button>
          </Tooltip>
          <Tooltip title="Youtube">
            <Button
              variant="outlined"
              sx={{
                width: "auto",
                pl: 0,
                pr: 0,
                ml: "5px",
                borderRadius: "10px",
              }}
            >
              <YouTubeIcon sx={{ p: 0 }} fontSize="large" />
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
