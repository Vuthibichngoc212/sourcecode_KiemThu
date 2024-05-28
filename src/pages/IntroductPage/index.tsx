import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGetIntroductionQuery } from "~/redux/api/api.caller";
import { Img } from "../NewsPage/ChildRecipePage/styled";
import { DivStyled } from "./styled";

const IntroductPage = () => {
  const { data } = useGetIntroductionQuery();

  return (
    <Box sx={{ height: "auto" }} pl={52} pr={40} pt={4} pb={5}>
      {data &&
        data.map((item, index) => (
          <Box key={index} sx={{ width: "85%" }}>
            <Typography fontWeight="bold" variant="h4">
              {item.head}
            </Typography>
            <Box mt={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                {item.title}
              </Typography>
              <Typography sx={{ whiteSpace: "break-spaces" }} variant="body1">
                {item.body.subTitle}
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                {item.body.subContent}
              </Typography>
              <Typography sx={{ whiteSpace: "break-spaces" }} variant="body1">
                {item.body.subDescription}
              </Typography>
              <DivStyled>
                <Img src={item.image.imageHead.imageItem1} />
                <Img src={item.image.imageHead.imageItem2} />
              </DivStyled>
              <Typography variant="body1">{item.body.subPolicy}</Typography>
              <DivStyled>
                <Img src={item.image.imageContent.imagePolicy1} />
                <Img src={item.image.imageContent.imagePolicy2} />
              </DivStyled>
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default IntroductPage;
