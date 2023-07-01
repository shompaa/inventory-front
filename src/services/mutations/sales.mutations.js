import { client, enviroment } from "../../config";

const { SALES_URL } = enviroment;
export const createSale = async (data) => {
  const response = await client.post(SALES_URL, data);
  return response;
};

export const deleteSale = async (id) => {
  const response = await client.delete(`${SALES_URL}/${id}`);
  return response;
};
