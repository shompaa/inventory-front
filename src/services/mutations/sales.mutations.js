import { client, enviroment } from "../../config";

const { SALES_URL } = enviroment;
export const createSale = async (data) => {
  const response = await client.post(SALES_URL, data);
  return response;
};
