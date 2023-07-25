import { client, enviroment } from "../../config";

const { PRODUCTS_URL } = enviroment;

export async function getProducts() {
  const response = await client.get(PRODUCTS_URL);
  return Promise.resolve(response?.data?.data);
}

export async function getProductsPaginated({ pageSize, startAt } = {}) {
  const params = {};
  if (pageSize) {
    params.pageSize = pageSize;
  }
  if (startAt) {
    params.startAt = startAt;
  }
  const response = await client.get(`${PRODUCTS_URL}/paginated`, { params });
  return Promise.resolve(response?.data);
}
