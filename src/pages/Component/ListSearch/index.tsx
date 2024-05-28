import { useMemo, useRef, useState } from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useGetProductWithSearchQuery } from "~/redux/api/api.caller";
import Box from "@mui/material/Box";

import { Autocomplete } from "@mui/material";
import { useDebounce } from "~/hooks";
// import { useNavigate } from "react-router-dom";

const ListSearch = () => {
  const [inputValue, setInputValue] = useState<string>("");
  // const navigate = useNavigate();
  const debouncedValue = useDebounce<string>(inputValue, 500);
  const { data } = useGetProductWithSearchQuery(debouncedValue);
  const htmlRef = useRef<HTMLDivElement>(null);

  const productList = useMemo(() => {
    if (data) {
      return data.map((option) => option.title);
    }
    return [];
  }, [data]);

  const handleFocus = () => {
    // console.log("htmlRef", htmlRef.current);
    if (htmlRef.current) {
      htmlRef.current.focus();
    }
  };
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Autocomplete
          freeSolo
          fullWidth
          // sx={{ width: "49rem" }}
          disableClearable
          options={productList}
          renderInput={(params) => {
            // setInputValue(String(params.inputProps.value));
            return (
              <TextField
                {...params}
                label="Tìm kiếm sản phẩm..."
                onChange={handleChangeInput}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
                inputRef={htmlRef}
              />
            );
          }}
        />
        <Button
          onClick={handleFocus}
          variant="text"
          sx={{
            height: "57px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        >
          <SearchIcon sx={{ width: "50" }} fontSize="large" />
        </Button>
      </Box>
    </>
  );
};

export default ListSearch;
