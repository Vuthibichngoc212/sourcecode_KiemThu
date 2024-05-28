import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useGetPostRecipeQuery } from "~/redux/api/api.caller";

const PostRecipe = () => {
  const { data } = useGetPostRecipeQuery();
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/recipe/${id}`);
  };
  return (
    <>
      {data &&
        data.map((post, index) => (
          <Grid key={index} item xs={6}>
            <Box
              sx={{
                display: "flex",
              }}
              pl={"23px"}
              mt={"25px"}
            >
              <Box>
                <img
                  style={{ width: "150px", height: "120px", cursor: "pointer" }}
                  src={post.image}
                  onClick={() => handleNavigate(post.id)}
                />
              </Box>
              <Box pl={2} sx={{ width: "300px" }}>
                <Typography
                  sx={{
                    display: "-webkit-box",
                    width: "100%",
                    height: "8vh",
                    fontWeight: "bold",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    cursor: "pointer",
                  }}
                  onClick={() => handleNavigate(post.id)}
                  variant="body1"
                >
                  {post.title}
                </Typography>
                <Typography> {post.dateTime}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
    </>
  );
};

export default PostRecipe;
