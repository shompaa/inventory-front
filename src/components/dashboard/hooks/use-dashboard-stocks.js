import { useQuery } from "react-query";
import { getProductsLowStock } from "../../../services/queries";

export const useDashboardStocks = () => {
  return useQuery("getProductsWithLowStock", () => getProductsLowStock());
};
