import { useQuery } from "react-query";
import { getProductBySearchParam, getSales } from "../../../services/queries";

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
