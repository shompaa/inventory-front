import { client, enviroment } from "../../config";

const { PRODUCTS_URL } = enviroment;
export const createProduct = async (data) => {
  const response = await client.post(PRODUCTS_URL, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response?.data?.data;
};

export const deleteProduct = async (id) => {
  const response = await client.delete(`${PRODUCTS_URL}/${id}`);
  return response;
};
