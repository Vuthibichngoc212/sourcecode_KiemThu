import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetProductItemQuery,
} from "~/redux/api/api.caller";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IProducts, IProductsData } from "~/interfaces/products";
import { addToCart } from "~/redux/features/dashboard.slice";
import { useDispatch } from "react-redux";
import { BoxStyle } from "./styled";
import { red } from "@mui/material/colors";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import Describe from "../Component/Products/Child/Descripbe/Describe";
import TitleItem from "../Component/Products/Child/TitleItem";
import Intruction1 from "../Component/Products/Child/Instruction2";
import Intruction2 from "../Component/Products/Child/Instruction1";
import { ToastContainer, toast } from "react-toastify";
import BoardItem from "~/component/BoardContent/BoardItem";
import Grid from "@mui/material/Grid";

const ChildPage = () => {
  const Ids = useParams();
  // console.log("id:", Number(Ids.id));
  const { data, isLoading } = useGetProductByIdQuery({ id: Number(Ids.id) });
  const { data: getAllItem } = useGetProductItemQuery();
  const [itemById, setItemById] = useState<IProducts>();
  const [count, setCount] = useState<number>(1);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState<boolean>(false);
  const [checked1, setChecked1] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const [checked3, setChecked3] = useState<boolean>(false);
  const [productValue, setProductValue] = useState<IProducts[]>([]);

  useEffect(() => {
    if (getAllItem) setProductValue(getAllItem);
  }, [data]);

  useEffect(() => {
    if (data) setItemById(data);
  }, [data]);

  const handleAddCard = ({
    id,
    title,
    image,
    quantity,
    totalPrice,
    price,
    brand,
  }: IProductsData) => {
    console.log(quantity);
    dispatch(
      addToCart({ id, title, image, quantity, totalPrice, price, brand })
    );
    toast.success("Successly added", {
      autoClose: 2000,
      position: "top-right",
      theme: "light",
    });
  };

  const handleSubtractCard = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      toast.error("Error removed", {
        autoClose: 2000,
        position: "bottom-right",
        theme: "light",
      });
    }
  };

  const handleShow = () => {
    setChecked(!checked);
  };
  const handleShow1 = () => {
    setChecked1(!checked1);
  };
  const handleShow2 = () => {
    setChecked2(!checked2);
  };
  const handleShow3 = () => {
    setChecked3(!checked3);
  };

  return (
    <Box>
      {!isLoading && data ? (
        <>
          {/* <NoticalBox /> */}
          <ToastContainer />

          <Box pl={52} pr={40} pt={2}>
            <Box
              sx={{
                height: "150vh",
                bgcolor: "#eeeeee",
                mb: 2,
                overflow: "hidden",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: 2,
                    p: 1,
                    pt: 2,
                  }}
                >
                  <Box sx={{ width: "30%", pl: 2 }}>
                    <img style={{ width: "100%" }} src={data.image} alt="/" />
                  </Box>
                  <Box sx={{ width: "34%", mr: 10 }}>
                    <Typography variant="h5">{data.title}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        pt: "5px",
                      }}
                    >
                      <BoxStyle>
                        <Typography variant="body1">Mã Sản phẩm:</Typography>
                        &ensp;
                        <Typography sx={{ fontWeight: "bold" }} variant="body1">
                          M11010
                        </Typography>
                      </BoxStyle>
                      <BoxStyle>
                        <Typography variant="body1">Tình trạng:</Typography>
                        &ensp;
                        <Typography sx={{ fontWeight: "bold" }} variant="body1">
                          Còn hàng
                        </Typography>
                      </BoxStyle>
                    </Box>
                    <BoxStyle>
                      <Typography variant="h5">Giá:</Typography>
                      &emsp;
                      <Typography variant="h6">
                        {data.price.toFixed(3)}
                      </Typography>
                    </BoxStyle>
                    <BoxStyle>
                      <Typography variant="h6">Số lượng:</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() => handleSubtractCard()}
                        >
                          <RemoveIcon />
                        </Button>
                        <Typography>{count}</Typography>
                        <Button
                          size="small"
                          onClick={() => setCount(count + 1)}
                        >
                          <AddIcon />
                        </Button>
                      </Box>
                    </BoxStyle>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-around",
                        pt: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          color: red[500],
                          borderRadius: 50,
                          borderColor: red[500],
                          "&:hover": {
                            borderColor: red[600],
                            bgcolor: red[600],
                            color: "white",
                          },
                        }}
                        onClick={() =>
                          handleAddCard({
                            id: data.id,
                            title: data.title,
                            image: data.image,
                            quantity: count,
                            totalPrice: data.totalPrice,
                            price: data.price,
                            brand: data.brand,
                          })
                        }
                      >
                        <Typography variant="body1">Thêm vào giỏ</Typography>
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: 50,
                          bgcolor: red[600],
                          "&:hover": {
                            bgcolor: red[800],
                          },
                        }}
                      >
                        <Typography variant="body1">Mua ngay</Typography>
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ width: "20%", ml: 5, mr: 1 }}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "17vh",
                        bgcolor: "white",
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Thương hiệu:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", mt: 3 }}
                      >
                        Hạn sử dụng:
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "21vh",
                        bgcolor: "white",
                        borderRadius: 2,
                        p: 2,
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        Chính sách bán hàng
                      </Typography>
                      <BoxStyle style={{ marginTop: 20 }}>
                        <GppGoodOutlinedIcon sx={{ color: "primary.light" }} />
                        &nbsp;
                        <Typography>Thực phẩm an toàn</Typography>
                      </BoxStyle>
                      <BoxStyle style={{ marginTop: 20 }}>
                        <AutorenewOutlinedIcon
                          sx={{ color: "primary.light" }}
                        />
                        &nbsp;
                        <Typography>Miễn phí đổi trả tới 72h</Typography>
                      </BoxStyle>
                      <BoxStyle style={{ marginTop: 20 }}>
                        <LocalShippingOutlinedIcon
                          sx={{ color: "primary.light" }}
                        />
                        &nbsp;
                        <Typography>Giao hàng tận nơi</Typography>
                      </BoxStyle>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ pl: 5, maxWidth: "78%" }}>
                <Describe
                  itemById={itemById}
                  checked={checked}
                  handleShow={handleShow}
                />

                <TitleItem
                  itemById={itemById}
                  checked={checked1}
                  handleShow={handleShow1}
                />

                <Intruction1
                  itemById={itemById}
                  checked={checked2}
                  handleShow={handleShow2}
                />
                <Intruction2
                  itemById={itemById}
                  checked={checked3}
                  handleShow={handleShow3}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Button
                  sx={{
                    bgcolor: red[500],
                    "&:hover": {
                      bgcolor: red[700],
                    },
                    color: "white",
                    borderRadius: 50,
                    mt: 3,
                  }}
                  variant="contained"
                >
                  <Typography variant="h5">Sản phẩm liên quan</Typography>
                </Button>
              </Box>
              <Grid
                container
                spacing={{ xs: 2, sm: 2, md: 1 }}
                columns={{ sx: 4, sm: 8, md: 10 }}
                sx={{
                  pl: "5rem",
                  pr: "5rem",
                  height: "70vh",
                  overflow: "hidden",
                }}
              >
                <BoardItem productValue={productValue} />
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  textAlign: "center",
                  mb: 5,
                }}
              >
                <Button variant="outlined">
                  <NavLink
                    to="/products"
                    style={{
                      textDecoration: "none",
                      color: "#00a3ba",
                      fontSize: 15,
                    }}
                  >
                    Xem thêm...
                  </NavLink>
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default ChildPage;
