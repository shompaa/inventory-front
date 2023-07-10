import { useQuery } from "react-query";
import {
  getProductBySearchParam,
  getProducts,
} from "../../../services/queries";

export const useProductsBySearch = (search) => {
  return useQuery(
    "getProductsBySearch",
    () => getProductBySearchParam(search),
    {
      enabled: false,
      retry: 1,
    }
  );
};

export const useProducts = () => {
  return useQuery("getProducts", () => getProducts());
};
