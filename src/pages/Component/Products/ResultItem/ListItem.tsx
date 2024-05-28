import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { addToCart, dashboardSelector } from "~/redux/features/dashboard.slice";
import { IProductsData } from "~/interfaces/products";
import { IListItem } from "~/interfaces/handleCheck";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";

const ListItem = ({ valueItem }: IListItem) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItem = useSelector(dashboardSelector);
  const [increase, setIncrease] = useState<number>(1);
  const handleAddToCart = ({
    id,
    title,
    image,
    quantity,
    totalPrice,
    price,
    brand,
  }: IProductsData) => {
    const checked = cartItem.find((item) => item.id === id);
    // console.log("check item cart:", checked);
    // console.log(typeof checked);

    dispatch(
      addToCart({ id, title, image, quantity, totalPrice, price, brand })
    );
    setIncrease(increase);
    if (!!checked) {
      toast.warning("Sản phẩm đã có trong giỏ hàng", {
        autoClose: 2000,
        position: "bottom-right",
        theme: "light",
      });
    } else {
      toast.success("Add successfully", {
        autoClose: 2000,
        position: "bottom-right",
        theme: "light",
      });
    }
  };

  const handleNavigateChild = (id: number) => {
    navigate(`/products/${id}`);
  };
  return (
    <>
      {valueItem.length &&
        valueItem.map((item, index) => (
          <Grid key={index} item>
            <Box
              sx={{
                width: 170,
                height: 272,
                m: 2,
                color: "black",
                textDecoration: "none",
                border: "1px solid #c3c3c3",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <Box onClick={() => handleNavigateChild(item.id)}>
                <img style={{ width: 168, height: "auto" }} src={item.image} />
                <Typography
                  sx={{
                    display: "-webkit-box",
                    pl: 1,
                    width: "100%",
                    fontWeight: "bold",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                  variant="body1"
                >
                  {item.title}
                </Typography>
              </Box>
              <Box
                px={1}
                sx={{
                  display: "flex",
                  mt: 2,
                  justifyContent: "space-between",
                }}
              >
                <Typography>{item.price.toFixed(3)}₫</Typography>
                <Button
                  sx={{ mr: -2, p: 0, width: "5px" }}
                  onClick={() =>
                    handleAddToCart({
                      id: item.id,
                      title: item.title,
                      image: item.image,
                      quantity: increase,
                      totalPrice: item.totalPrice,
                      price: item.price,
                      brand: item.brand,
                    })
                  }
                  // variant="outlined"
                >
                  <AddShoppingCartIcon
                    sx={{
                      backgroundColor: "primary.light",
                      color: "white",
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                  />
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
    </>
  );
};

export default ListItem;
