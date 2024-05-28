import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import { useGetProductItemQuery } from "~/redux/api/api.caller";
import { IProducts } from "~/interfaces/products";
import ResultProductItem from "../Component/Products/ResultItem";
import { listBrand } from "./config";
import CheckedPrice from "../Component/Products/CheckIProductItem/CheckboxPrice";
import { ToastContainer } from "react-toastify";

const Products = () => {
  const [valueItem, setValueItem] = useState<IProducts[]>([]);
  const { data } = useGetProductItemQuery();
  const [checked, setChecked] = useState<Array<boolean>>([true, true, true]);
  // console.log("checked", checked);

  useEffect(() => {
    if (data) {
      setValueItem(data);
    }
  }, [data]);

  // const renderItem = useMemo(() => {
  //   return
  // }, [checked]);

  const handleCheckAll = () => {
    const isCheckedAll = checked.every((checked) => checked);
    if (data) {
      if (isCheckedAll) {
        setChecked([false, false, false]);
        return setValueItem([]);
      } else {
        setChecked([true, true, true]);
        return setValueItem(data);
      }
    }
  };

  const handleSelectItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.target.id);
    const newChecked = e.target.checked;
    // console.log("newChecked", newChecked);

    setChecked(
      checked.map((checked, idx) => {
        if (index === idx) {
          return newChecked;
        } else {
          return checked;
        }
      })
    );
    if (data) {
      if (newChecked) {
        const checkedArray = data.filter(
          (item) => item.idBrand === String(index)
        );
        setValueItem((prev) => [...prev, ...checkedArray]);
      } else {
        setValueItem((prev) =>
          prev.filter((item) => item.idBrand !== String(index))
        );
      }
    }
  };

  return (
    <>
      {data ? (
        <>
          <Box pl={50} pr={46} sx={{ width: "100%", display: "flex" }}>
            <ToastContainer />
            <Box
              sx={{
                width: "25%",
                height: "50%",
                m: 2,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#eeeeee",
                }}
              >
                <FormControlLabel
                  label="Thương hiệu"
                  control={
                    <Checkbox
                      id="all"
                      checked={checked[0] && checked[1] && checked[2]}
                      // indeterminate={checked[0] !== checked[1]}
                      onChange={handleCheckAll}
                    />
                  }
                />

                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  {listBrand.map((brand, index) => (
                    <FormControlLabel
                      name="Brand"
                      key={index}
                      label={brand.label}
                      control={
                        <Checkbox
                          id={String(index)}
                          checked={checked[index]}
                          onChange={handleSelectItem}
                        />
                      }
                    />
                  ))}
                </Box>
              </Box>
              <CheckedPrice valueItem={valueItem} setValueItem={setValueItem} />
            </Box>
            <ResultProductItem
              valueItem={valueItem}
              setValueItem={setValueItem}
            />
          </Box>
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default Products;
