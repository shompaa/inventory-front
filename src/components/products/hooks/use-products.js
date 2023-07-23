import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { getProductsPaginated } from "../../../services/queries";
import { createProduct } from "../../../services/mutations/products.mutations";

export const useProducts = () => {
  return useInfiniteQuery(
    "getProducts",
    ({ pageParam = null }) => getProductsPaginated({ startAt: pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.hasMore && lastPage.startAt,
    }
  );
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation((data) => createProduct(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("product");
    },
  });
};
