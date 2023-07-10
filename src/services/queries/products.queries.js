import { client, enviroment } from "../../config";

const { PRODUCTS_URL } = enviroment;

export async function getProducts() {
  const response = await client.get(PRODUCTS_URL);
  return Promise.resolve(response?.data?.data);
}
