import { client, enviroment } from "../../config";

const { SALES_URL, PRODUCTS_SEARCH_URL } = enviroment;

export async function getSales() {
  const response = await client.get(SALES_URL);
  return Promise.resolve(response?.data?.data);
}

export async function getProductBySearchParam(search) {
  console.log("search", PRODUCTS_SEARCH_URL(search));
  const response = await client.get(enviroment.PRODUCTS_SEARCH_URL(search));
  return Promise.resolve(response?.data?.data);
}
