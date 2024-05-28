import { ReactComponent as LogoIcon } from "~/assets/logo.svg";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import Account from "~/pages/Component/Acccount";
import ShopingCard from "~/pages/Component/ShopingCard";
import ListSearch from "~/pages/Component/ListSearch";
import { useSelector } from "react-redux";
import { dashboardSelector } from "~/redux/features/dashboard.slice";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const AppBar = () => {
  const notice = useSelector(dashboardSelector);
  const noticeCart = notice.reduce((acc, curr) => acc + curr.quantity, 0);
  // console.log(noticeCart);
  return (
    <>
      <Box
        pl={50}
        pr={42}
        sx={{
          height: "70px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "white",
          borderBottom: "1px solid #bdbdbd",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "15%",
            mr: 2,
            ml: 1,
          }}
        >
          <NavLink to="/">
            <SvgIcon
              component={LogoIcon}
              inheritViewBox
              sx={{ width: "8vw", height: "15vh" }}
            />
          </NavLink>
        </Box>
        <Box sx={{ pl: "20px", pt: "5px", width: "69%" }}>
          <ListSearch />
        </Box>
        <Box sx={{ borderLeft: `1px solid #e5e5e5`, width: "6%" }}>
          <Account />
        </Box>
        <Box
          sx={{
            width: "5%",
            display: "flex",
            borderLeft: `1px solid #e5e5e5`,
          }}
        >
          <ShopingCard />
          <Box>
            {noticeCart > 0 ? (
              <Typography
                sx={{
                  width: "25px",
                  transform: "translateX(-90%) translateY(-20%)",
                  height: "50%",
                  bgcolor: "orange",
                  textAlign: "center",
                  borderRadius: "10px",
                }}
              >
                {noticeCart}
              </Typography>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AppBar;
