import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  useGetCategoryQuery,
  useGetProductItemQuery,
} from "~/redux/api/api.caller";
import { IListItem } from "~/interfaces/handleCheck";

const CategoriesFilter = ({ setValueItem }: IListItem) => {
  //data Products
  const { data } = useGetProductItemQuery();

  //data Categories
  const { data: categoriesData } = useGetCategoryQuery();
  const [typeValue, setTypeValue] = useState<string>("");

  const handleChange = (e: SelectChangeEvent<string>) => {
    setTypeValue(e.target.value);
  };
  const handleClick = (key: string) => {
    if (data) {
      const result = data.filter((item) => item.type === key);
      setValueItem(result);
    }
  };

  const handleClickNone = () => {
    if (data) {
      setValueItem(data);
    }
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 180 }}>
      <InputLabel id="demo-simple-select-standard-label">Loại</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={typeValue}
        label="type"
        onChange={handleChange}
      >
        <MenuItem onClick={handleClickNone} value="None">
          None
        </MenuItem>
        {categoriesData &&
          categoriesData.map((item, index) => (
            <MenuItem
              key={index}
              value={item.title}
              onClick={() => handleClick(item.type)}
            >
              {item.title}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default CategoriesFilter;
