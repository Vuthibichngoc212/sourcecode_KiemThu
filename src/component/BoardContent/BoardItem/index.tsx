import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, dashboardSelector } from "~/redux/features/dashboard.slice";
import { IProducts, IProductsData } from "~/interfaces/products";
import Grid from "@mui/material/Grid";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IProductdata {
  productValue: IProducts[];
}

const BoardItem = ({ productValue }: IProductdata) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(dashboardSelector);
  const [increase, setIncrease] = useState<number>(1);
  const navigate = useNavigate();

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
    console.log(typeof checked);

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
      toast.success("Thêm sản phẩm thành công", {
        autoClose: 2000,
        position: "bottom-right",
        theme: "light",
      });
    }
  };

  const handleNavigate = (id: number) => {
    navigate(`/products/${id}`);
  };
  return (
    <>
      {productValue &&
        productValue.map((item, index) => (
          <Grid key={index} item xs={2} md={2}>
            <Box
              sx={{
                width: 170,
                height: 272,
                m: 2,
                border: "1px solid #c3c3c3",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <img
                style={{ width: 168, height: "auto" }}
                src={item.image}
                onClick={() => handleNavigate(item.id)}
              />

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
                onClick={() => handleNavigate(item.id)}
              >
                {item.title}
              </Typography>
              <Box
                px={1}
                sx={{ display: "flex", mt: 2, justifyContent: "space-between" }}
              >
                <Typography>{item.price.toFixed(3)}₫</Typography>
                <Button
                  id="buttonAddToCard"
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

export default BoardItem;
