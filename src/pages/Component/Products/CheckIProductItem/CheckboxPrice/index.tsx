import { ListPrice } from "~/pages/ProductsPage/config";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { IPriceCheckbox } from "./interface";
import { useGetProductItemQuery } from "~/redux/api/api.caller";

const CheckedPrice = ({ setValueItem }: IPriceCheckbox) => {
  const { data } = useGetProductItemQuery();

  const [checkedPrice, setCheckedPrice] = useState<Array<boolean>>([
    true,
    true,
    true,
  ]);

  const handleCheckAll = () => {
    const isCheckedAll = checkedPrice.every((checked) => checked);
    if (data) {
      if (isCheckedAll) {
        setCheckedPrice([false, false, false]);
        return setValueItem([]);
      } else {
        setCheckedPrice([true, true, true]);
        return setValueItem(data);
      }
    }
  };

  const handleCheckSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.target.id);
    const newCheckedPrice = e.target.checked;

    setCheckedPrice(
      checkedPrice.map((checked, idx) => {
        if (index === idx) {
          return newCheckedPrice;
        } else {
          return checked;
        }
      })
    );
    if (data) {
      if (newCheckedPrice) {
        const checkedArrayList = data.filter((item) => item.idPrice === index);
        setValueItem((prev) => [...prev, ...checkedArrayList]);
      } else {
        setValueItem((prev) => prev.filter((item) => item.idPrice !== index));
      }
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        mt: 5,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        bgcolor: "#eeeeee",
      }}
    >
      <FormControlLabel
        label="Giá "
        control={
          <Checkbox
            id="checkAll"
            checked={checkedPrice[0] && checkedPrice[1] && checkedPrice[2]}
            onChange={handleCheckAll}
          />
        }
      />

      <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
        {ListPrice.map((price, index) => (
          <FormControlLabel
            name="Price"
            key={index}
            label={price.priceItem}
            control={
              <Checkbox
                id={String(index)}
                checked={checkedPrice[index]}
                onChange={handleCheckSelected}
              />
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default CheckedPrice;
