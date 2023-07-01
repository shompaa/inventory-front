import { client, enviroment } from "../../config";

const { PRODUCTS_URL } = enviroment;

export async function getProductsLowStock() {
  const response = await client.get(`${PRODUCTS_URL}/low-stock`);
  return Promise.resolve(response?.data?.data);
}
