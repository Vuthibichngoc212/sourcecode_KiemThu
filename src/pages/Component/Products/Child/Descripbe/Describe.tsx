import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BoxStyle } from "~/pages/ChildPage/styled";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { IsChildPage } from "~/interfaces/child";

const Describe = ({ itemById, checked, handleShow }: IsChildPage) => {
  return (
    <Box>
      <BoxStyle>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Mô tả
        </Typography>

        <Button onClick={handleShow} size="small">
          {checked ? (
            <KeyboardArrowUpOutlinedIcon />
          ) : (
            <KeyboardArrowDownOutlinedIcon />
          )}
        </Button>
      </BoxStyle>
      {checked && (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            Thông tin sản phẩm
          </Typography>
          {itemById && (
            <>
              <Typography>&ensp;{itemById?.body.head}</Typography>
              <Typography>&ensp;{itemById?.body.content}</Typography>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Describe;
