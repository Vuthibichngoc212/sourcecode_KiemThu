import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ListItem from "./ListItem";
import { IListItem } from "~/interfaces/handleCheck";
import CategoriesFilter from "../FilterTypeItem";
import { Divider } from "@mui/material";

const ResultProductItem = ({ valueItem, setValueItem }: IListItem) => {
  return (
    <Box
      sx={{
        width: "100%",
        m: 2,
        pb: 2,
        borderRadius: 3,
        bgcolor: "#eeeeee",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "9vh",
          alignItems: "center",
          p: 1,
          justifyContent: "right",
        }}
      >
        <CategoriesFilter valueItem={valueItem} setValueItem={setValueItem} />
      </Box>
      <Divider />
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={{ xs: 2 }}>
          <ListItem valueItem={valueItem} setValueItem={setValueItem} />
        </Grid>
      </Box>
    </Box>
  );
};

export default ResultProductItem;
