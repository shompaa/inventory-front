import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { getSales } from "../../../services/queries";
import { createSale, deleteSale } from "../../../services/mutations";

export const useSales = () => {
  return useInfiniteQuery(
    "getSales",
    ({ pageParam = null }) => getSales({ startAt: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.hasMore && lastPage.startAt,
    }
  );
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => createSale(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("postSales");
    },
  });
};

export const useDeleteSale = () => {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteSale(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("deleteSales");
    },
  });
};
