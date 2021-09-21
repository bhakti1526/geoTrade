import axios from "axios";

export const imgPost = async (img) => {
  let formData = new FormData();

  formData.append("img", img);

  let imgUrl = null;
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/api/img/upload`, formData)
    .then((res) => {
      imgUrl = res.data.data;
    });

  return imgUrl;
};
