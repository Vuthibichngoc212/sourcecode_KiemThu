export interface IIntroducts {
  head: string;
  title: string;
  image: {
    imageHead: {
      imageItem1: string;
      imageItem2: string;
    };
    imageTitle: string;
    imageContent: {
      imagePolicy1: string;
      imagePolicy2: string;
    };
  };
  body: {
    subTitle: string;
    subContent: string;
    subDescription: string;
    subPolicy: string;
  };
}
