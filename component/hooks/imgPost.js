import axios from "axios";

export const imgPost = async (img) => {
  let formData = new FormData();

  formData.append("img", img);

  let imgUrl = null;
  await axios
    .post("http://localhost:4000/api/img/upload", formData)
    .then((res) => {
      imgUrl = res.data.data;
    });

  return imgUrl;
};
