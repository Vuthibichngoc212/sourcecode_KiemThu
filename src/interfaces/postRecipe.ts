export interface IPostRecipe {
  id: number;
  title: string;
  dateTime: string;
  image: string;
  imageCaption: string;
  imageTitle: string;
  imageBody: string;
  body: {
    subCaption: string;
    subTitle: string;
    subBody: string;
    subContent: string;
    subDecription: string;
  };
}
