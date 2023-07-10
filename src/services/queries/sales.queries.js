import { client, enviroment } from "../../config";

const { SALES_URL, PRODUCTS_SEARCH_URL } = enviroment;

export async function getSales({ pageSize, startAt } = {}) {
  const params = {};
  if (pageSize) {
    params.pageSize = pageSize;
  }
  if (startAt) {
    params.startAt = startAt;
  }
  const response = await client.get(SALES_URL, { params });
  console.log(response?.data);
  return Promise.resolve(response?.data);
}

export async function getProductBySearchParam(search) {
  const response = await client.get(enviroment.PRODUCTS_SEARCH_URL(search));
  return Promise.resolve(response?.data?.data);
}
