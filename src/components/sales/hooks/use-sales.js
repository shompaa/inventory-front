import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSales } from "../../../services/queries";
import { createSale } from "../../../services/mutations";

export const useSales = () => {
  return useQuery("getSales", () => getSales());
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => createSale(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("postSales");
    },
  });
};
