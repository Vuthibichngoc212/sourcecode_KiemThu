import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPostRecipeByIdQuery,
  useGetPostRecipeQuery,
} from "~/redux/api/api.caller";
import { DivStyled, Img } from "./styled";

const ChildRecipePage = () => {
  const Ids = useParams();
  const { data, isLoading } = useGetPostRecipeByIdQuery({ id: Number(Ids.id) });
  const { data: recipeData } = useGetPostRecipeQuery();
  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    navigate(`/recipe/${id}`);
  };
  return (
    <Box sx={{ height: "auto" }} pl={52} pr={40} pt={4} pb={5}>
      {!isLoading && data ? (
        <Box sx={{ display: " flex " }}>
          <Box
            sx={{
              width: "75%",
              pr: "2rem",
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              {data.title}
            </Typography>
            <Typography
              sx={{ pt: 1, color: "#757579" }}
              align="right"
              variant="body1"
            >
              {data.dateTime}
            </Typography>
            <DivStyled>
              <Img src={data.imageCaption} />
            </DivStyled>
            <Typography
              sx={{ whiteSpace: "break-spaces" }}
              variant="subtitle1"
              fontWeight="bold"
            >
              {data.body.subCaption}
            </Typography>
            <DivStyled>
              <Img src={data.imageCaption} />
            </DivStyled>
            <Typography sx={{ whiteSpace: "break-spaces" }} variant="subtitle1">
              {data.body.subTitle}
            </Typography>

            <DivStyled>
              <Img src={data.imageTitle} />
            </DivStyled>
            <Typography sx={{ whiteSpace: "break-spaces" }} variant="subtitle1">
              {data.body.subContent}
            </Typography>

            <DivStyled>
              <Img src={data.imageBody} />
            </DivStyled>
            <Typography variant="subtitle1">
              {data.body.subDecription}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "25%",
              height: "50rem",
              bgcolor: "#eeeeee",
              mb: 2,
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6" align="center">
              Bài viết mới nhất
            </Typography>
            {recipeData &&
              recipeData.map((post, index) => (
                <Box
                  key={index}
                  sx={{ p: 1, display: "flex", cursor: "pointer" }}
                  onClick={() => handleNavigate(post.id)}
                >
                  <img style={{ width: "85px" }} src={post.imageCaption} />
                  <Typography sx={{ pl: 1 }}>{post.title}</Typography>
                </Box>
              ))}
          </Box>
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default ChildRecipePage;
